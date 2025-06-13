/* eslint-disable prettier/prettier */
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with secret key and API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});

/**
 * POST /api/create-checkout-session
 * Creates a Stripe Checkout session with cart items and user info.
 */
export async function POST(request) {
  const body = await request.json();

  try {
    // Build Stripe line items from cart
    const line_items = body.cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.productName,
          description: item.productDescription || "",
          images: item.productImageUrl ? [item.productImageUrl] : [],
        },
        unit_amount: Math.round(item.productPrice * 100), // Stripe expects cents
      },
      quantity: item.quantity || 1,
    }));

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email: body.email,
      metadata: {
        name: body.name,
        phone: body.phone,
        address: body.address,
        city: body.city,
        state: body.state,
        zipcode: body.zipcode,
        country: body.country || "Nigeria",
        // Store a summary of the cart in metadata for reference
        cartSummary: JSON.stringify(
          body.cartItems.map((item) => ({
            product: item.productName,
            quantity: item.quantity,
          }))
        ),
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    if (!session || !session.url) {
      throw new Error("Stripe session creation failed");
    }

    // Respond with the Stripe Checkout URL
    return NextResponse.json({ url: session.url });
  } catch (error) {
    // Log and return error
    return NextResponse.json(
      { error: `Stripe session creation failed: ${error}` },
      { status: 500 }
    );
  }
}
