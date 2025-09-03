"use client";
import {env} from "@/env";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import usePremiumModal from "@/hooks/usePremiumModal";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { set } from "date-fns";
import { createCheckoutSession } from "./actions";


const freeFearures = [
  "Only 3 free Resumes",
  "No Templates",
  "Basic features",
];
const premiumFeatures = [
  "5 Premium Resumes",
  "Only 5 Templates",
  "Enable special features",
  "Unlimited Work Experience",
  "Unlimited Education",
  "Limited AI functionality",
];
const premiumProFeatures = [
  "Unlimited Resumes",
  "Unlimited Templates",
  "Unlimited Work Experience",
  "Unlimited Education",
  "Unlimited Skills",
  "Unlimited Projects",
  "Full AI functionality",
  "AI Cover Letter Generation",

];

export default function PremiumModal() {
  const { isOpen, setOpen } = usePremiumModal();

  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  async function handlePremiumClick(priceId: string) {
    try {
      setLoading(true);
      const redirectUrl = await createCheckoutSession(priceId);
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Please try again",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open => {
        if(!loading) {
            setOpen(open);
        }
    })}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upgrade to Pro</DialogTitle>
          <DialogDescription>
            Upgrade to Pro to unlock all features.
          </DialogDescription>

          <div className="flex">
            <div className="flex w-1/3 flex-col space-y-2">
              <h3 className="text-center text-lg font-bold">Premium</h3>
              <ul className="list-inside space-y-2">
                {freeFearures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 ">
                    <Check className="size-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() =>
                  handlePremiumClick(
                    env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_MONTHLY!
                  )
                }
                disabled={loading}
              >
                Upgrade
              </Button>
            </div>
            
            <div className="border-l mx-6" />

            <div className="flex w-1/3 flex-col space-y-2">
              <h3 className="text-center text-lg font-bold">Premium</h3>
              <ul className="list-inside space-y-2">
                {premiumFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 ">
                    <Check className="size-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() =>
                  handlePremiumClick(
                    env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_MONTHLY!
                  )
                }
                disabled={loading}
              >
                Upgrade
              </Button>
            </div>

            <div className="border-l mx-6" />

            <div className="flex w-1/3 flex-col space-y-2 ">
              <h3 className="text-center text-lg font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Premium Pro
              </h3>
              <ul className="list-inside space-y-2">
                {premiumProFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                  >
                    <Check className="size-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                onClick={() =>
                  handlePremiumClick(
                    env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_PRO_MONTHLY!
                  )
                }
                disabled={loading}
              >
                Upgrade
              </Button>
            </div>
          </div>
        </DialogHeader>
        {/* <DialogFooter>
                <Button>Upgrade</Button>
            </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
