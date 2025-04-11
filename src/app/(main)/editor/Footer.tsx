import { Button } from "@/components/ui/button";
import Link from "next/link";
import { steps } from "./steps";
import next from "next";
import { cn } from "@/lib/utils";

interface FooterProps {
    currentStep: string;
    setCurrentStep: (step: string) => void;
    showSmResumePreview: boolean;
    setShowSmResumePreview: (show: boolean) => void;
    isSaving: boolean;
}



export default function Footer({ currentStep, setCurrentStep,showSmResumePreview, setShowSmResumePreview, isSaving }: FooterProps) {
    const previousStep = steps.find(
        (_, index) => steps[index + 1]?.key === currentStep
    )?.key;
    const nextStep = steps.find(
        (_, index) => steps[index - 1]?.key === currentStep
    )?.key;

    return <div><footer className="w-full border-t px-3 py-3 bottom-0 mt-auto">
    <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
      <div className="flex gap-3 items-center">
        <Button variant="secondary" 
        onClick={ previousStep ? () => setCurrentStep(previousStep): undefined}
        disabled={!previousStep}
        >Previous Step</Button>
        <Button 
        onClick={nextStep ? () => setCurrentStep(nextStep): undefined}
        disabled={!nextStep}>Next Step</Button>

        <Button 
        variant="outline"
        
        onClick={() => setShowSmResumePreview(!showSmResumePreview)}
        className="md:hidden"
        title={showSmResumePreview ? "Input Form " : "Resume Preview"}
        >Preview</Button>

      </div>
      <div className="flex gap-3 items-center">
        <Button variant="secondary" asChild>
          <Link href="/resumes"> Close</Link>
        </Button>
        <p className={cn("text-muted-foreground opacity-0", isSaving && "opacity-100")}>...Saving</p>
      </div>
    </div>
  </footer>
  </div>
}

