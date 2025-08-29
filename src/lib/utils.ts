import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import { clsx, type ClassValue } from "clsx"
import exp from "constants";
import { title } from "process";
import { twMerge } from "tailwind-merge"
import { ResumeServerData } from "./types";
import { ResumeValues } from "./validaton"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File
  ?{
    name: value.name,
    type: value.type,
    size: value.size,
    lastModified: value.lastModified,
  }
  : value;
}
export function mapToResumeValues(data: ResumeServerData):ResumeValues{
  return {
    id: data.id,
    title: data.title || undefined,
    description: data.description || undefined,
    photo: data.photoUrl || undefined,
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    jobTitle: data.jobTitle || undefined,
    phone: data.phone || undefined,
    city: data.city || undefined,
    country: data.country || undefined,
    email: data.email || undefined,
    workExperiences: data.workExperiences?.map(exp => ({
      position:exp.position || undefined,
      company: exp.company || undefined,
      startDate :exp.startDate?.toString().split("T")[0],
      endDate: exp.endDate?.toString().split("T")[0],
      description: exp.description || undefined
    })),
    educations: data.educations?.map(edu => ({
      degree:edu.school || undefined,
      school: edu.degree || undefined,
      startDate :edu.startDate?.toString().split("T")[0],
      endDate: edu.endDate?.toString().split("T")[0],
      
    })),
    skills: data.skills,
    borderStyle: data.borderStyle,
    colorHex: data.colorHex,
    summary: data.summary || undefined,

  }
}