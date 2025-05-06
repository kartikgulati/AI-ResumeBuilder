import PremiumModal from "@/components/premium/PremiumModal";
import Navbar from "./Navbar";

export default function Layout({ children }:{ children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            {children}
            <PremiumModal />
            </div>
    );
}