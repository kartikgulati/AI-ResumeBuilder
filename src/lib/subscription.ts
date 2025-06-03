import { env } from "@/env";
import { cache } from "react";
import prisma from "./ prisma";
export type SubscriptionLevel = "free" | "premium" | "pro";

export const getUserSubscriptionLevel = cache(

    async (userId: string): Promise<SubscriptionLevel> => {
        const subscription = await prisma.userSubscription.findUnique({
            where: {
                userId,
            },
        });

        if (!subscription || subscription.stripeCurrentPeriodEnd < new Date()) {
            return "free";
        }
        if (subscription.stripePriceId === env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_MONTHLY) {
            return "premium";
        }
        if (subscription.stripePriceId === env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_PRO_MONTHLY) {
            return "pro";
        }
        throw new Error("Invalid subscription");
        })
        