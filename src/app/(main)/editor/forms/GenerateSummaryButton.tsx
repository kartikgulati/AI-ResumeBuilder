import { ResumeValues } from "@/lib/validaton";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { WandSparkles, WandSparklesIcon } from "lucide-react";
import LoadingButton from "@/components/LoadingButton";
import { generateSummary } from "@/app/(main)/editor/forms/action";
import { useSubscriptionLevel } from "../../SubscriptionLevelProvider";
import usePremiumModal from "@/hooks/usePremiumModal";
import { canUseAiTool } from "@/lib/permissions";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export default function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const subscriptionLevel = useSubscriptionLevel();

  const premiumModal = usePremiumModal();

  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  async function handleCLick() {

    if (!canUseAiTool(subscriptionLevel)) {
                premiumModal.setOpen(true);
                return;
            }
    try {
      setLoading(true);
      const aiResponse = await generateSummary(resumeData);
      onSummaryGenerated(aiResponse);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong while generating the summary",
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <LoadingButton
      variant="outline"
      type="button"
      onClick={handleCLick}
      loading={loading}
    >
      <WandSparklesIcon className="size-5" />
      Generate AI Summary
    </LoadingButton>
  );
}
