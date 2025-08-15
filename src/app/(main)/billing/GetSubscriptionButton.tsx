"use Client"

import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";

export default function GetSubscriptionButton() {
    const premiumModal = usePremiumModal();

    return <Button 
            className="flex mx-auto w-fit gap-2" 
            onClick={() => premiumModal.setOpen(true)}
            variant="default">
        Get Subscription
    </Button>
}