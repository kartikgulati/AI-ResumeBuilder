"use server"

import { currentUser } from "@clerk/nextjs/server";
import { error } from "console";
import { env } from "process";
import Stripe from "stripe";

export async function createCustomerPortalSession(){
    const user  = await currentUser();
    if (!user){
        throw new Error("User is not authenticated");
    }

    const stripeCustomerId = user.privateMetadata.stripeCustomerId as 
    | string
    | undefined;

    if (!stripeCustomerId){
        throw new Error("No stripe customer id found");
    }

    const stripe = new Stripe(env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2025-01-27.acacia",
    });

    const session = await stripe.billingPortal.sessions.create({
        customer: stripeCustomerId,
        return_url: `${env.NEXT_PUBLIC_BASE_URL}/billing`
    });

    if(!session.url){
        throw new Error("Failed to create stripe customer portal session");
    }
    return session.url;
}