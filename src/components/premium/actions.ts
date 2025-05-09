"use server";

import stripe from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";

export async function createCheckoutSession(priceId: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing`,
    customer_email: user.emailAddresses[0].emailAddress,
    subscription_data: { metadata: { userId: user.id } 
    },
    custom_text: {
        terms_of_service_acceptance: {
            message: `By subscribing, you agree to our terms of service.[terms of service](${process.env.NEXT_PUBLIC_BASE_URL}/tos)`

        }
    },
    consent_collection: {
        terms_of_service: "required"
    }
  });
  if(!session.url){
    throw new Error("No checkout session url");
  }
  return session.url;
}
