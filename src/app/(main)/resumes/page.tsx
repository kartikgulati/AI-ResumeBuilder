import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";


export const meta: Metadata = {
    title: "Your Resumes",
    
};
export default function Page() {
    return (
    <main className="max-w-7xl mx-auto w-full px-5 py-6 space-y-6"> 
        
        <Button asChild className="flex mx-auto w-fit gap-2">
            
            <Link href="/editor" > 
            <PlusSquare className="size-5" />
             New Resume
            </Link>
        </Button> 
    </main>
    );
}
 