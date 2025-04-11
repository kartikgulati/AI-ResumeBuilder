"use server"

import prisma from "@/lib/ prisma";
import resumeSchema, { ResumeValues } from "@/lib/validaton";
import { auth } from "@clerk/nextjs/server";
import { access } from "fs";

export  async function saveResume(values: ResumeValues) {
const {id } = values;

console.log("Saving resume with id:", values);

const { photo, workExperiences,educations, ...resumeValues } = resumeSchema.parse(values);

const { userId } = await auth();

if (!userId) {
    throw new Error("User not authenticated");
}

const existingResume = id ? await prisma.resume.findUnique({
    where: { id, userId }})

    if (id && !existingResume) {
        throw new Error("Resume not found");
    }

    let  newPhotoUrl = string | undefined | null = undefined;
    if (photo instanceof File) {
        if (existingResume?photoUrl){
            await delete(existingResume.photoUrl);
        }
        const blob =await put (`resume_photos/${path.extname(photo.name)}`, photo,
        {
            access: "public",
        });
        newPhotoUrl = blob.url;
    }

}