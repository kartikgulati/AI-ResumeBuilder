import PremiumModal from "@/components/premium/PremiumModal";
import Navbar from "./Navbar";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import SubscriptionLevelProvider from "./SubscriptionLevelProvider";
import { auth } from "@clerk/nextjs/server";

export default async function Layout({ children }:{ children: React.ReactNode }) {
    const {userId } = await auth();

    if(!userId){
        return null;
    }

const userSubscriptionLevel = await getUserSubscriptionLevel(userId);


    return (
        <SubscriptionLevelProvider userSubscriptionLevel={userSubscriptionLevel}>
        <div className="flex flex-col min-h-screen">
            <Navbar />
            {children}
            <PremiumModal />
        </div>
        </SubscriptionLevelProvider>
    );
}