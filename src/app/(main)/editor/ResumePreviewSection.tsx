import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validaton";
import ColorPicker from "./ColorPicker";

interface ResumePreviewSectionProps {
    resumeData: ResumeValues;
    setResumeData: (data: ResumeValues) => void;
}

export default function ResumePreviewSection({resumeData, setResumeData}) {
    return (
        <div className="relative hidden w-1/2 md:flex">
            <div className="absolute top-1 left-1 flex flex-col gap-2 flex-none lg:top-3 lg:left-3">
                <ColorPicker
                color={resumeData.color} onChange={(color) => setResumeData({...resumeData, colorHex: color.hex})} />
            </div>
            <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
                <ResumePreview resumeData={resumeData} className="max-w-2xl shadow-md" />
            </div>
        </div>
          
    )
}
