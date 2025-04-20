"use server"

import { GenerateSummaryInput } from "@/lib/validaton";
import openai, { OpenAI } from "openai";

export async function generateSummary(input: GenerateSummaryInput){

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
    model: "gpt-3.5-turbo",
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