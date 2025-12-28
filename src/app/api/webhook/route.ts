import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { kv } from "@vercel/kv";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(key);
}

// Determine tier based on donation amount
function getTier(amount: number): "producer" | "executive" | "associate" | "patron" | "supporter" {
  if (amount >= 2500) return "producer";
  if (amount >= 1000) return "executive";
  if (amount >= 500) return "associate";
  if (amount >= 250) return "patron";
  return "supporter";
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

    // Get donation amount from metadata
    const amount = parseInt(session.metadata?.donation_amount || "0");

    // Get custom fields
    const customFields = session.custom_fields || [];
    const displayNameField = customFields.find(f => f.key === "display_name");
    const anonymousField = customFields.find(f => f.key === "anonymous");

    // Determine if anonymous
    const isAnonymous = anonymousField?.dropdown?.value === "yes";

    // Get name: custom display name > billing name > "Anonymous"
    let name = "Anonymous";
    if (!isAnonymous) {
      if (displayNameField?.text?.value) {
        name = displayNameField.text.value;
      } else if (session.customer_details?.name) {
        name = session.customer_details.name;
      }
    }

    const donor = {
      id: session.id,
      name,
      tier: getTier(amount),
      amount,
      date: new Date().toISOString(),
      anonymous: isAnonymous,
    };

    try {
      // Store donor in Vercel KV
      // Use a sorted set with timestamp as score for ordering
      await kv.zadd("donors", {
        score: Date.now(),
        member: JSON.stringify(donor),
      });

      console.log("Donor added:", donor);
    } catch (err) {
      console.error("Failed to store donor:", err);
    }
  }

  return NextResponse.json({ received: true });
}
