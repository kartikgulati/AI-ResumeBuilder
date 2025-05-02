"use server"

import prisma from "@/lib/ prisma";
import { auth } from "@clerk/nextjs/server"
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function deleteResume(id:string){
    const { userId } = await auth();

    if (!userId){
        throw new Error("User not authenticated");
    }

    const resume = await prisma.resume.findUnique({
        where: { id, userId }
    })

    if (!resume){   
        throw new Error("Resume not found");
    }

    if (resume.photoUrl){
        await del(resume.photoUrl);
    }

    await prisma.$transaction(async (tx) => {
        // Delete related work experiences
        await tx.workExperience.deleteMany({
            where: { resumeID: id }
        });

        // Delete related educations
        await tx.education.deleteMany({
            where: { resumeID: id }
        });

        // Finally delete the resume
        await tx.resume.delete({
            where: { id }
        });
    });
    revalidatePath("/resumes");
}