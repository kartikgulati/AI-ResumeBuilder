import { NextRequest } from "next/server";
import stripe, { Stripe } from "stripe";
import { env } from "@/env";
import { log } from "console";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {

    try{

        const payload  = await req.text();
        const signature = req.headers.get("stripe-signature");

        if (!signature){
            return new Response ("Missing Signatures",{status: 400});
        }

        const event  = Stripe.webhooks.constructEvent(
            payload,
            signature,
            env.STRIPE_WEBHOOK_KEY 
        )

        console.log(`Received event:${event.type}`,event.data.object);

        switch(event.type){
            case "checkout.session.completed":
                await handleSeesionCompleted(event.data.object)
                break;
            
            case "customer.subscription.created":
            case "customer.subscription.updated":
                await handleSubscriptionCreatedOrUpdated(event.data.object.id);
                break;

            case "customer.subscription.deleted":
                await handleSubscriptionDeleted(event.data.object.id);
                break;

                default:
                    console.log(`uknown evet type: ${event.type}`);

        }   

        return new Response("Webhook Received Successfully", {status:200})

    }catch(error){
        console.error(error);
        return new Response("Internal Server Error" ,{status:500})
    }
}

    async function handleSeesionCompleted(session: Stripe.Checkout.Session){

        const userId = sessionStorage.metadata?.userId;

        if(!userId){
            console.error("No user found in the session.")
        }

        (await clerkClient()).users.updateUserMetadata(userId, {
            privateMetadata:{
                stripeCustomerId: session.customer as string,
            }
        })
        

    }

async function handleSubscriptionCreatedOrUpdated(subscriptionId:string) {
        console.log("Subscription created or updated");
    }
    
async function handleSubscriptionDeleted(subscriptionId:string) {
        console.log("Subscription deleted");
    }