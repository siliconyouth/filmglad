import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(key);
}

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe();
    const { amount, locale } = await request.json();

    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const origin = request.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: locale === "sr" ? "Donacija za film GLAD" : "HUNGER Film Donation",
              description: locale === "sr"
                ? "Podrška za film i kampanju mentalnog zdravlja"
                : "Support for the film and mental health campaign",
            },
            unit_amount: Math.round(amount * 100), // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/${locale}/donate?success=true`,
      cancel_url: `${origin}/${locale}/donate?canceled=true`,
      metadata: {
        locale,
        donation_amount: amount.toString(),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
