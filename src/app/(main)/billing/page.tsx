import {Metadata} from "next";
import {auth} from "@clerk/nextjs/server";
import prisma from "@/lib/ prisma";
import stripe from "@/lib/stripe";
import Stripe from "stripe";
import GetSubscriptionButton from "./GetSubscriptionButton";
import {formatDate} from "date-fns"
import ManageSubscriptionButton from "./ManageSubscriptionButton";

export const metadata : Metadata ={
    title: "Biiling",
}

export default async function Page() {
    
    const { userId } = await auth();

    if (!userId) {
        return null;
    }
    const subscription = await prisma.userSubscription.findUnique({
        where: {userId}
    })

    const priceInfo = subscription
    ? await stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"]
    })
    :null;

    return <main className="max-w-7xl mx-auto w-full space-y-6 px-3 py-6">
        <h1 className="font-bold text-3xl">Billing Information</h1>
        <p>
            Your current plan {" "}
            <span className="font-semibold">
                {priceInfo? (priceInfo.product as Stripe.Product).name : "Free"}
                </span>
        </p>

        { subscription ? (
            <>
            {subscription.stripeCancelAtPeriodEnd && (
                <p className="text-destructive">
                    Your subscription will be cancelled on {" "}
                    {formatDate(subscription.stripeCurrentPeriodEnd, "MMMM dd,yyyy")}
                </p>
            )}
            <ManageSubscriptionButton/>
            </>
        ) : (
            <GetSubscriptionButton/>
        )}
            
    </main>;
}