
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

    .refine(file =>!file || file.size <=1024*1024*4,"File size must be less than 4MB",),
    firstName: optionalString,
    lastName: optionalString,
    email: optionalString,
    phone: optionalString,
    city: optionalString,
    jobTitle: optionalString,
});

export type personalInfoValues = z.infer<typeof personalInfoSchema>;