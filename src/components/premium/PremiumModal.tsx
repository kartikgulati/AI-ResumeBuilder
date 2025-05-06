"use client";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import usePremiumModal from "@/hooks/usePremiumModal";

const premiumFeatures = [
    "Unlimited Resumes",
    "Unlimited Templates",
    "Unlimited Work Experience",
    "Unlimited Education",
    "Unlimited Skills",
    "Unlimited Projects"
]
const premiumProFeatures = [
    "Unlimited Resumes",
    "Unlimited Templates",
    "Unlimited Work Experience",
    "Unlimited Education",
    "Unlimited Skills",
    "Unlimited Projects"
]

export default function PremiumModal() {

    const {isOpen, setOpen} = usePremiumModal();


    return <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Upgrade to Pro</DialogTitle>
                <DialogDescription>
                    Upgrade to Pro to unlock all features.
                </DialogDescription>

                    <div className="flex">
                        <div className="flex w-1/2 flex-col space-y-2">
                            <h3 className="text-center text-lg font-bold">
                                Premium
                            </h3>
                            <ul className="list-inside space-y-2">{premiumFeatures.map(feature=>(
                                <li key={feature} className="flex items-center gap-2 ">
                                    <Check className="size-4 text-green-500"/>
                                        {feature}
                                    
                                </li>
                            ))}
                            </ul>
                            
                <Button>Upgrade</Button>

                            </div>

                        <div className="border-l mx-6"/>

                        <div className="flex w-1/2 flex-col space-y-2 ">
                        <h3 className="text-center text-lg font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                Premium Pro
                            </h3>
                            <ul className="list-inside space-y-2">{premiumProFeatures.map(feature=>(
                                <li key={feature} className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    <Check className="size-4 text-green-500"/>
                                        {feature}
                                    
                                </li>
                            ))}
                            </ul>
                            <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Upgrade</Button>
                        </div>
                    </div>



            </DialogHeader>
            {/* <DialogFooter>
                <Button>Upgrade</Button>
            </DialogFooter> */}
        </DialogContent>
    </Dialog>;
}