"use server"

import { canUseAiTool } from "@/lib/permissions";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { GenerateSummaryInput, GenerateWorkExperienceInput, generateWorkExperienceSchema, WorkExperience } from "@/lib/validaton";
import { auth } from "@clerk/nextjs/server";
import openai, { OpenAI } from "openai";
import { use } from "react";

export async function generateSummary(input: GenerateSummaryInput){

    const {userId} = await auth();
    if(!userId){
        throw new Error("User not authenticated");
    }

    const subscriptionLevel = await getUserSubscriptionLevel(userId);
    
    if(!canUseAiTool(subscriptionLevel)){
        throw new Error("You have to update the subscription for this feature");
    }


    const{
        jobTitle,
        workExperiences,
        educations,
        skills,
    } = input;
    const systemMessage =`You are a resume builder AI. You will be provided with the user's work experience, education, and skills. Based on this information, you will generate a summary for the user's resume. The summary should be concise and highlight the user's key qualifications and experiences. The user is applying for the job title. Do not include any other information in the response other than the summary. Make it professional and consice`;

    const userMessage = `Please generate a summary for the following information:

    Job Title: ${jobTitle || "N/A"}

    Work Experience: ${workExperiences?.map(exp => `${exp.position || "N/A"} at ${exp.company || "N/A"} (${exp.startDate || "N/A"} - ${exp.endDate || "Present"}
    
    Description: ${exp.description || "N/A"}`).join("\n\n") || "N/A"}


    Education: ${educations?.map(edu => `${edu.degree || "N/A"} from ${edu.school || "N/A"} (${edu.startDate || "N/A"} - ${edu.endDate || "N/A"})`).join("\n\n") || "N/A"}

    Skills: ${skills}

    
    `;

console.log("System Memory:", systemMessage);
console.log("User userMessage:", userMessage);

const client = new OpenAI();

const completion = await client.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage },
    ]
});

const aiResponse = completion.choices[0].message.content;

if (!aiResponse) {
    throw new Error("No response from OpenAI");
}
return aiResponse;

}


export async function generateWorkExperience (input: GenerateWorkExperienceInput){

 const {userId} = await auth();
    if(!userId){
        throw new Error("User not authenticated");
    }

    const subscriptionLevel = await getUserSubscriptionLevel(userId);
    
    if(!canUseAiTool(subscriptionLevel)){
        throw new Error("You have to update the subscription for this feature");
    }
    


const {description} = generateWorkExperienceSchema.parse(input);
const systemMessage =`
you are a resume builder AI. Your task is to generate a work experience entry and description based on the user's input.
your response should include the following structure and format and remove information if they cannot be found in the user's input.

Position: [Position]
Company: [Company Name]
Start Date: <format: YYYY-MM-DD>(only if available)
End Date: <format: YYYY-MM-DD>(only if available)
Description: [Generate an optimized description based on the user's input. The description should be concise and highlight the user's key qualifications and experiences. Make it professional and concise. And it must be in a bullet point format. The description should be 2-3 sentences lond and shoukd be highlight the user's achievements.]
`

const userMessage=`Please generate a work experience entry based on the following information:${description}`


const client = new OpenAI();

const completion = await client.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage },
    ]
});

const aiResponse = completion.choices[0].message.content;

if (!aiResponse) {
    throw new Error("No response from OpenAI");
}
console.log("AI Response:", aiResponse);

return {
    position: aiResponse.match(/Position: (.*)/)?.[1] || "",
    company: aiResponse.match(/Company: (.*)/)?.[1] || "",
    description: (aiResponse.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
    startDate: aiResponse.match(/Start Date: (\d{4}-\d{2}-\d{2})/)?.[1],
    endDate: aiResponse.match(/End Date: (\d{4}-\d{2}-\d{2})/)?.[1],
} satisfies WorkExperience
}