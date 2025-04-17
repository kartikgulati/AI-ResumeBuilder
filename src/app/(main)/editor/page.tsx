import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";
import prisma from "@/lib/ prisma";
import { auth } from "@clerk/nextjs/server";
import { resumeDataInclude } from "@/lib/types";

interface PageProps{
    searchParams: Promise<{resumeId?: string}>
}

export const meta: Metadata = {
    title: "Design your dream resume",
    
};

export default async function Page({searchParams}: PageProps) {

    const { resumeId } = await searchParams;

    const{userId}= await auth();

    if (!userId){
       return null;
    }
    
    const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where:{id:resumeId, userId},
        include:resumeDataInclude,
    }):null

    return <ResumeEditor />;
}