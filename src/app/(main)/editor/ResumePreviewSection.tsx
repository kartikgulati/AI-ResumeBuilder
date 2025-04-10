import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validaton";
import ColorPicker from "./ColorPicker";
import BorderStyleButton from "./BorderStyleButton";
import { cn } from "@/lib/utils";

interface ResumePreviewSectionProps {
    resumeData: ResumeValues;
    setResumeData: (data: ResumeValues) => void;
    className?: string;

}

export default function ResumePreviewSection({resumeData, setResumeData, className}: ResumePreviewSectionProps) {
    return (
        <div className={cn("group relative hidden md:w-1/2 md:flex w-full", className)}>
            <div className="opacity-50 xl:opacity-100 transition-opacity group-hover:opacity-100 absolute top-1 left-1 flex flex-col gap-2 flex-none lg:top-3 lg:left-3">
                <ColorPicker
                color={resumeData.colorHex} 
                onChange={(color) => setResumeData({...resumeData, colorHex: color.hex})} />

                <BorderStyleButton
                borderStyle={resumeData.borderStyle} 
                onChange={(borderStyle) => setResumeData({...resumeData, borderStyle})} />
                
            </div>
            <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
                <ResumePreview resumeData={resumeData} className="max-w-2xl shadow-md" />
            </div>
        </div>
    )
}
