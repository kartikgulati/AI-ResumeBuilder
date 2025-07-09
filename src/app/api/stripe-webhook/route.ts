import { NextRequest } from "next/server";
import { Stripe } from "stripe";
import { env } from "@/env";
import { log } from "console";
import { clerkClient } from "@clerk/nextjs/server";
import stripe from "@/lib/stripe";
import prisma from "@/lib/ prisma";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return new Response("Missing Signatures", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );


    //fixing webhook signature verification and event handling 

  //    const body = await req.text();

  // let event: Stripe.Event;
  // try {
  //   event = stripe.webhooks.constructEvent(
  //     body,
  //     signature,
  //     env.STRIPE_WEBHOOK_SECRET
  //   );
  // } catch (err) {
  //   console.error("Webhook signature verification failed.", err);
  //   return new Response("Webhook signature verification failed", { status: 400 });
  // }

    console.log(`Received event:${event.type}`, event.data.object);

    switch (event.type) {
      case "checkout.session.completed":
        await handleSessionCompleted(event.data.object);
        break;

      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionCreatedOrUpdated(event.data.object.id);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      default:
        console.log(`uknown evet type: ${event.type}`);
    }

    return new Response("Webhook Received Successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

async function handleSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = sessionStorage.metadata?.userId;

  if (!userId) {
    console.error("No user found in the session.");
  }

  (await clerkClient()).users.updateUserMetadata(userId, {
    privateMetadata: {
      stripeCustomerId: session.customer as string,
    },
  });
}

async function handleSubscriptionCreatedOrUpdated(subscriptionId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  if (
    subscription.status === "active" ||
    subscription.status === "trialing" ||
    subscription.status === "past_due"
  ) {
    await prisma.userSubscription.upsert({
      where: {
        userId: subscription.metadata.userId,
      },
      create: {
        userId: subscription.metadata.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
        stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
      update:{ 
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
        stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
      }
    });
  } else {
    await prisma.userSubscription.deleteMany({
      where: {
        stripeCustomerId: subscription.customer as string,
      },
    });
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await prisma.userSubscription.deleteMany({
      where: {
        stripeCustomerId: subscription.customer as string,
      },
    });
}

// import { env } from "@/env";
// import prisma from "@/lib/ prisma";
// import stripe from "@/lib/stripe";
// import { clerkClient } from "@clerk/nextjs/server";
// import { NextRequest } from "next/server";
// import Stripe from "stripe";

// export async function POST(req: NextRequest) {
//   try {
//     const payload = await req.text();
//     const signature = req.headers.get("stripe-signature");

//     if (!signature) {
//       return new Response("Signature is missing", { status: 400 });
//     }

//     const event = stripe.webhooks.constructEvent(
//       payload,
//       signature,
//       env.STRIPE_WEBHOOK_SECRET,
//     );

//     console.log(`Received event: ${event.type}`, event.data.object);

//     switch (event.type) {
//       case "checkout.session.completed":
//         await handleSessionCompleted(event.data.object);
//         break;
//       case "customer.subscription.created":
//       case "customer.subscription.updated":
//         await handleSubscriptionCreatedOrUpdated(event.data.object.id);
//         break;
//       case "customer.subscription.deleted":
//         await handleSubscriptionDeleted(event.data.object);
//         break;
//       default:
//         console.log(`Unhandled event type: ${event.type}`);
//         break;
//     }

//     return new Response("Event received", { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return new Response("Internal server error", { status: 500 });
//   }
// }

// async function handleSessionCompleted(session: Stripe.Checkout.Session) {
//   const userId = session.metadata?.userId;

//   if (!userId) {
//     throw new Error("User ID is missing in session metadata");
//   }

//   await (
//     await clerkClient()
//   ).users.updateUserMetadata(userId, {
//     privateMetadata: {
//       stripeCustomerId: session.customer as string,
//     },
//   });
// }

// async function handleSubscriptionCreatedOrUpdated(subscriptionId: string) {
//   const subscription = await stripe.subscriptions.retrieve(subscriptionId);

//   if (
//     subscription.status === "active" ||
//     subscription.status === "trialing" ||
//     subscription.status === "past_due"
//   ) {
//     await prisma.userSubscription.upsert({
//       where: {
//         userId: subscription.metadata.userId,
//       },
//       create: {
//         userId: subscription.metadata.userId,
//         stripeSubscriptionId: subscription.id,
//         stripeCustomerId: subscription.customer as string,
//         stripePriceId: subscription.items.data[0].price.id,
//         stripeCurrentPeriodEnd: new Date(
//           subscription.current_period_end * 1000,
//         ),
//         stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
//       },
//       update: {
//         stripePriceId: subscription.items.data[0].price.id,
//         stripeCurrentPeriodEnd: new Date(
//           subscription.current_period_end * 1000,
//         ),
//         stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
//       },
//     });
//   } else {
//     await prisma.userSubscription.deleteMany({
//       where: {
//         stripeCustomerId: subscription.customer as string,
//       },
//     });
//   }
// }

// async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
//   await prisma.userSubscription.deleteMany({
//     where: {
//       stripeCustomerId: subscription.customer as string,
//     },
//   });
// }
