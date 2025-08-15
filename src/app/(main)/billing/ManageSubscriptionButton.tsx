"use client"

import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/hooks/use-toast";
import { create } from "domain";
import React from "react";
import { createCustomerPortalSession } from "./action";

export default function ManageSubscriptionButton() {
    const {toast} = useToast();

    const [loading, setLoading] = React.useState(false);

    async function handleClick(){
        try {
            setLoading(true);
            const redirectUrl = await createCustomerPortalSession();
          window.location.href = redirectUrl;
        } catch (error) {
            console.error(error);
      toast({
        variant: "destructive",
        description: "Please try again",
      });
        }finally{
            setLoading(false);
        }

    }

    return <LoadingButton onClick={handleClick} loading={loading}>Manage Subscription</LoadingButton>
}
