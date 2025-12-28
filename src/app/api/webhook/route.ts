import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { kv } from "@vercel/kv";
import { Resend } from "resend";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(key);
}

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return null;
  }
  return new Resend(key);
}

// Determine tier based on donation amount
function getTier(amount: number): "producer" | "executive" | "associate" | "patron" | "supporter" {
  if (amount >= 2500) return "producer";
  if (amount >= 1000) return "executive";
  if (amount >= 500) return "associate";
  if (amount >= 250) return "patron";
  return "supporter";
}

// Get tier name for email
function getTierName(tier: string, locale: string): string {
  const names: Record<string, Record<string, string>> = {
    producer: { en: "Producer", sr: "Producent" },
    executive: { en: "Executive Producer", sr: "Izvršni producent" },
    associate: { en: "Associate Producer", sr: "Pridruženi producent" },
    patron: { en: "Patron", sr: "Patron" },
    supporter: { en: "Supporter", sr: "Podržavalac" },
  };
  return names[tier]?.[locale] || names[tier]?.en || tier;
}

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Get donation amount and locale from metadata
    const amount = parseInt(session.metadata?.donation_amount || "0");
    const locale = session.metadata?.locale || "en";

    // Get custom fields
    const customFields = session.custom_fields || [];
    const displayNameField = customFields.find(f => f.key === "display_name");
    const anonymousField = customFields.find(f => f.key === "anonymous");

    // Determine if anonymous
    const isAnonymous = anonymousField?.dropdown?.value === "yes";

    // Get customer details from Stripe
    const customerEmail = session.customer_details?.email || "";
    const customerName = session.customer_details?.name || "";
    const billingAddress = session.customer_details?.address;

    // Get display name: custom > billing name > "Anonymous"
    let displayName = "Anonymous";
    if (!isAnonymous) {
      if (displayNameField?.text?.value) {
        displayName = displayNameField.text.value;
      } else if (customerName) {
        displayName = customerName;
      }
    }

    const tier = getTier(amount);
    const now = new Date().toISOString();

    // Public donor info (for display)
    const publicDonor = {
      id: session.id,
      name: displayName,
      tier,
      amount,
      date: now,
      anonymous: isAnonymous,
    };

    // Full donor info (for contact purposes - private)
    const fullDonorInfo = {
      id: session.id,
      stripeSessionId: session.id,
      email: customerEmail,
      name: customerName,
      displayName,
      tier,
      amount,
      date: now,
      anonymous: isAnonymous,
      locale,
      billingAddress: billingAddress ? {
        city: billingAddress.city,
        country: billingAddress.country,
        line1: billingAddress.line1,
        line2: billingAddress.line2,
        postalCode: billingAddress.postal_code,
        state: billingAddress.state,
      } : null,
    };

    try {
      // Store public donor info (for website display)
      await kv.zadd("donors", {
        score: Date.now(),
        member: JSON.stringify(publicDonor),
      });

      // Store full donor info (for contact purposes)
      await kv.hset(`donor:${session.id}`, fullDonorInfo);

      // Add to donor emails list for easy lookup
      if (customerEmail) {
        await kv.sadd("donor_emails", customerEmail);
      }

      console.log("Donor added:", publicDonor);
      console.log("Full donor info stored for:", customerEmail);
    } catch (err) {
      console.error("Failed to store donor:", err);
    }

    // Send thank you email
    if (customerEmail) {
      const resend = getResend();
      if (resend) {
        try {
          const tierName = getTierName(tier, locale);
          const filmTitle = locale === "sr" ? "GLAD" : "HUNGER";

          const subject = locale === "sr"
            ? `Hvala na donaciji za film ${filmTitle}!`
            : `Thank you for your donation to ${filmTitle}!`;

          const baseUrl = "https://filmglad.com";
          const titleImage = locale === "sr" ? `${baseUrl}/email-title-sr.png` : `${baseUrl}/email-title-en.png`;

          const htmlContent = locale === "sr"
            ? `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 30px;">
                <div style="text-align: center; margin-bottom: 30px;">
                  <img src="${titleImage}" alt="GLAD" width="300" style="max-width: 100%; height: auto;" />
                </div>
                <h2 style="font-size: 24px; margin-bottom: 20px;">Hvala Vam, ${customerName || "dragi donatoru"}!</h2>
                <p style="line-height: 1.6;">Vaša donacija od <strong style="color: #e11d48;">€${amount}</strong> je uspešno primljena.</p>
                <p style="line-height: 1.6;">Sada ste naš <strong>${tierName}</strong> i vaše ime će biti prikazano u odjavnoj špici filma.</p>
                <p style="line-height: 1.6;">Vaša podrška pomaže da završimo ovaj važan film o mentalnom zdravlju i emocionalnoj gladi.</p>
                <br/>
                <p>Sa zahvalnošću,<br/><strong>Tim filma GLAD</strong></p>
                <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;"/>
                <p style="color: #888; font-size: 12px; text-align: center;">
                  Deo prihoda od donacija ide u kampanje za podizanje svesti o mentalnom zdravlju.
                </p>
              </div>
            `
            : `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 30px;">
                <div style="text-align: center; margin-bottom: 30px;">
                  <img src="${titleImage}" alt="HUNGER" width="300" style="max-width: 100%; height: auto;" />
                </div>
                <h2 style="font-size: 24px; margin-bottom: 20px;">Thank you, ${customerName || "dear donor"}!</h2>
                <p style="line-height: 1.6;">Your donation of <strong style="color: #e11d48;">€${amount}</strong> has been successfully received.</p>
                <p style="line-height: 1.6;">You are now a <strong>${tierName}</strong> and your name will be displayed in the film credits.</p>
                <p style="line-height: 1.6;">Your support helps us complete this important film about mental health and emotional hunger.</p>
                <br/>
                <p>With gratitude,<br/><strong>The HUNGER Film Team</strong></p>
                <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;"/>
                <p style="color: #888; font-size: 12px; text-align: center;">
                  A portion of donation proceeds goes to mental health awareness campaigns.
                </p>
              </div>
            `;

          await resend.emails.send({
            from: "GLAD Film <producers@filmglad.com>",
            to: customerEmail,
            subject,
            html: htmlContent,
          });

          console.log("Thank you email sent to:", customerEmail);
        } catch (err) {
          console.error("Failed to send thank you email:", err);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
