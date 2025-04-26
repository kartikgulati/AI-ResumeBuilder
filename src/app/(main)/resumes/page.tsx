import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { resumeDataInclude } from "@/lib/types";
import prisma from "@/lib/ prisma";
import ResumeItems from "./ResumeItems";


export const meta: Metadata = {
    title: "Your Resumes",
    
};
export default async function Page() {

    const {userId}= await auth();
    if (!userId){
        return null;
    }

    const [resumes, totalCount] = await Promise.all([
        prisma.resume.findMany({
            where: {
                userId
            },
            orderBy: {
                updatedAt: "desc"
            },
            include:resumeDataInclude
            }) ,
        prisma.resume.count({
            where: {
                userId
            }

        })
    ])


    return (
    <main className="max-w-7xl mx-auto w-full px-5 py-6 space-y-6"> 
        
        <Button asChild className="flex mx-auto w-fit gap-2">
            
            <Link href="/editor" > 
            <PlusSquare className="size-5" />
             New Resume
            </Link>
        </Button> 
        <div className="space-y-1">
            <div className="text-3xl font-bold">
                <h1 className="text-3xl font-bold"> Your Resumes</h1>
                <p className="text-sm text-muted-foreground">
                    You've {totalCount} Resumes
                </p>
            </div>
            <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
                {resumes.map((resume =>
                    <ResumeItems key={resume.id} resume={resume} />
                ))}
            </div>
        </div>
    </main>
    );
}
 