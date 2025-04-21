import { ResumeValues } from "@/lib/validaton";
import {useToast} from "@/hooks/use-toast";
import { useState } from "react";
import { WandSparkles, WandSparklesIcon } from "lucide-react";
import LoadingButton from "@/components/LoadingButton";
import{generateSummary} from "@/app/(main)/editor/forms/action";

interface GenerateSummaryButtonProps {
    resumeData: ResumeValues;
    onSummaryGenerated: (summary: string) => void;
}

export default function GenerateSummaryButton({resumeData, onSummaryGenerated}: GenerateSummaryButtonProps) {
    const {toast} = useToast();   

    const [loading, setLoading] = useState(false);

    async function handleCLick() {

        try {
            setLoading(true);
            const aiResponse = await generateSummary(resumeData)
            onSummaryGenerated(aiResponse);

        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                description: "Something went wrong while generating the summary",
            })
        }finally{
            setLoading(false);
        }

    }
    return <LoadingButton
    variant="outline"
    type="button"
    onClick={handleCLick}
    loading={loading}
    >
        <WandSparklesIcon className="size-5" />Generate (AI)  
    </LoadingButton>
}