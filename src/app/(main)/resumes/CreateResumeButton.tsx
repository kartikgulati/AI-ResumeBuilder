"use client";
import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import { PlusSquare } from "lucide-react";
import Link from "next/link";

interface CreateResumeButtonProps {
    canCreate: boolean

}
export default function CreateResumeButton({ canCreate }: CreateResumeButtonProps) {
    const premiumModal = usePremiumModal();

    if (canCreate) {
        return <Button asChild className="flex mx-auto w-fit gap-2">
            
        <Link href="/editor" > 
        <PlusSquare className="size-5" />
         New Resume
        </Link>
    </Button> 
    }
 
    return <Button 
            className="flex mx-auto w-fit gap-2" 
            onClick={() => premiumModal.setOpen(true)}>
        <PlusSquare className="size-5" />
        New Resume
    </Button>
   
}