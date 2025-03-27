import { cn } from "@/lib/utils";

import { ResumeValues } from "@/lib/validaton"; 

interface ResumePreviewProps {
    resumeData: ResumeValues;
    className?: string;
}

export default function ResumePreview({resumeData,className}:ResumePreviewProps) {

    return (
        <div className={cn("bg-white text-black h-fit w-full aspect-[210/297]", className)}>
            <h1>this text will change based on the container size</h1>
            
        </div>
    )

}