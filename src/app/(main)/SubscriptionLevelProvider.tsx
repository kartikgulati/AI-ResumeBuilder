"use client";

import { getUserSubscriptionLevel, SubscriptionLevel } from "@/lib/subscription";
import { Children, createContext, use, useContext } from "react";

const SubscriptionLevelContext = createContext<SubscriptionLevel | undefined>(undefined);

interface SubscriptionLevelProviderProps {
    children: React.ReactNode;
    userSubscriptionLevel: SubscriptionLevel
}

export default function SubscriptionLevelProvider({ children, userSubscriptionLevel }: SubscriptionLevelProviderProps) {

    return <SubscriptionLevelContext.Provider value={userSubscriptionLevel}>
    {children}
    </SubscriptionLevelContext.Provider>

}

export function useSubscriptionLevel(){
    const context  = useContext(SubscriptionLevelContext);
    if (context === undefined) {
        throw new Error("useSubscriptionLevel must be used within a SubscriptionLevelProvider")
    }
    return context;
}