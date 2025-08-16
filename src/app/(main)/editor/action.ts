"use server"

import prisma from "@/lib/prisma";
import resumeSchema, { ResumeValues } from "@/lib/validaton";
import { auth } from "@clerk/nextjs/server";
import {del, put} from "@vercel/blob";
import exp from "constants";
import path from "path";
import { access } from "fs";
import { sub } from "date-fns";
import { canCreateResume, canUseCustomization } from "@/lib/permissions";
import { getUserSubscriptionLevel } from "@/lib/subscription";

export  async function saveResume(values: ResumeValues) {
const {id } = values;

console.log("Saving resume with id:", values);

const { photo, workExperiences,educations, ...resumeValues } = resumeSchema.parse(values);

const { userId } = await auth();

if (!userId) {
    throw new Error("User not authenticated");
}


const subscriptionLevel = await getUserSubscriptionLevel(userId);
if(!id){
    const resumeCount = await prisma.resume.count({
        where: {
            userId
        }
    })
    if(!canCreateResume(subscriptionLevel, resumeCount)){
        throw new Error("You have reached the maximum number of resumes");
    }
}



const existingResume = id ? await prisma.resume.findUnique({
    where: { id, userId }})
    : null;

    if (id && !existingResume) {
        throw new Error("Resume not found");
    }


    const hasCustomizations = (resumeValues.borderStyle && resumeValues.borderStyle !== existingResume?.borderStyle) || (
        resumeValues.colorHex && resumeValues.colorHex !== existingResume?.colorHex
    );

    if (hasCustomizations && !canUseCustomization(subscriptionLevel)) {
        throw new Error("You have reached the maximum number of customizations");
    }


    let  newPhotoUrl: string | number | undefined | null = undefined;
    if (photo instanceof File) {
        if (existingResume?.photoUrl){
            await del(existingResume.photoUrl);
        }
        const blob =await put (`resume_photos/${path.extname(photo.name)}`, photo,
        {
            access: "public",
        });
        newPhotoUrl = blob.url;
    }else if (photo === null) {
        if (existingResume?.photoUrl) {
            await del(existingResume.photoUrl);
        }
        newPhotoUrl = null;
    }

    function safeDate(dateStr: string | null | undefined) {
        if (!dateStr) return null;
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? null : d;
      }

if(id){
    return prisma.resume.update({
        where: {id},
        data: {
            ...resumeValues,
            photoUrl: newPhotoUrl,
            workExperiences: {
                deleteMany: {},
                create: workExperiences?.map(exp => ({
                    ...exp,
                    startDate: safeDate(exp.startDate),
                    endDate: safeDate(exp.endDate),
                })),
            },
            educations: {
                deleteMany: {},
                create: educations?.map(edu => ({
                    ...edu,
                    startDate: safeDate(edu.startDate),
                    endDate: safeDate(edu.endDate),
                })),
            },
            updatedAt: new Date(),
        }
    })
} else {
    return prisma.resume.create({
        data: {
            ...resumeValues,
            userId,
            photoUrl: newPhotoUrl,
            workExperiences: {
                create: workExperiences?.map(exp => ({
                    ...exp,
                    startDate: safeDate(exp.startDate),
                    endDate: safeDate(exp.endDate),
                })),
            },
            educations: {
                create: educations?.map(edu => ({
                    ...edu,
                    startDate: safeDate(edu.startDate),
                    endDate: safeDate(edu.endDate),
                })),
            }
        }
    })
}}

//     if(id){
//         return prisma.resume.update({
//             where: {id},
//             data: {
//                 ...resumeValues,
//                 photoUrl: newPhotoUrl,
//                 workExperiences: {
//                     deleteMany:{},
//                     create: workExperiences?.map(exp => ({
//                         ...exp,
//                         startDate: exp.startDate ? new Date(exp.startDate) : null,
//                         endDate: exp.endDate ? new Date(exp.endDate) : null,
//                     })),
//                 },
//                 educations: {
//                     deleteMany:{},
//                     create: educations?.map(edu => ({
//                         ...edu,
//                         startDate: exp.startDate ? new Date(exp.startDate) : null,
//                         endDate: exp.endDate ? new Date(exp.endDate) : null,
//                     })),
//                 },
//                 updatedAt: new Date(),
//             }
//         })
//     }else{
//         return prisma.resume.create({
//             data: {
//                 ...resumeValues,
//                 userId,
//                 photoUrl: newPhotoUrl,
//                 workExperiences: {
                    
//                     create: workExperiences?.map(exp => ({
//                         ...exp,
//                         startDate: exp.startDate ? new Date(exp.startDate) : null,
//                         endDate: exp.endDate ? new Date(exp.endDate) : null,
//                     })),
//                 },
//                 educations: {
//                     create: educations?.map(edu => ({
//                         ...edu,
//                         startDate: exp.startDate ? new Date(exp.startDate) : null,
//                         endDate: exp.endDate ? new Date(exp.endDate) : null,
//                     })),
//                 }
//             }
//         })
//     }
// }
        
