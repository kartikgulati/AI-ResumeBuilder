
import { z } from 'zod';

export const optionalString = z.string().trim().optional().or(z.literal(''));

export const generalInfoSchema = z.object({
    title: optionalString,
    description: optionalString,

});
export type generalInfoValues = z.infer<typeof generalInfoSchema>;

export const personalInfoSchema = z.object({
    photo: z.custom<File | undefined>()
    .refine(
        (file)=> !file || (file instanceof File && file.type.startsWith('image/')),
        "Please upload a valid image file"
    )

    .refine(file =>!file || file.size <=1024*1024*4,"File size must be less then 4 MB",),
    firstName: optionalString,
    lastName: optionalString,
    email: optionalString,
    phone: optionalString,
    city: optionalString,
    country: optionalString,
    jobTitle: optionalString,
});

export type personalInfoValues = z.infer<typeof personalInfoSchema>;


// 

export const workExperienceSchema = z.object({
    workExperiences:z.array(z.object({
        position:optionalString,
        company:optionalString,
        startDate:optionalString,
        endDate:optionalString,
        description:optionalString
    }),).optional(),
        
});

export type workExperienceValues = z.infer<typeof workExperienceSchema>;

export type WorkExperience = NonNullable<
  z.infer<typeof workExperienceSchema>["workExperiences"]
>[number];

// 


export const educationSchema = z.object({
    educations:z.array(z.object({
        school:optionalString,
        degree:optionalString,
        startDate:optionalString,
        endDate:optionalString,
    }),).optional(),
        
});

export type educationValues = z.infer<typeof educationSchema>;

export const skillsSchema = z.object({
    skills: z.array(z.string().trim()).optional(),
});

export type SkillsValues = z.infer<typeof skillsSchema>;


export const summarySchema = z.object({
    summary: optionalString,
})

export type summaryValues = z.infer<typeof summarySchema>;

const resumeSchema = z.object({
    ...generalInfoSchema.shape,
    ...personalInfoSchema.shape,
    ...workExperienceSchema.shape,
    ...educationSchema.shape,
    ...skillsSchema.shape,
    ...summarySchema.shape,
    colorHex: optionalString,
    borderStyle: optionalString,

});

export default resumeSchema;
export type ResumeValues = Omit<z.infer<typeof resumeSchema>,"photo">&{
    id?: string;
    phoyo?: File | string|null;
}