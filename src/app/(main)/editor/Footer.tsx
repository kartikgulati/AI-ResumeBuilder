import { Button } from "@/components/ui/button";
import Link from "next/link";
import { steps } from "./steps";
import next from "next";

interface FooterProps {
    currentStep: string;
    setCurrentStep: (step: string) => void;
}



export default function Footer({ currentStep, setCurrentStep }: FooterProps) {
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
      </div>
      <div className="flex gap-3 items-center">
        <Button variant="secondary" asChild>
          <Link href="/resumes"> Close</Link>
        </Button>
        <p className="text-muted-foreground">...Saving</p>
      </div>
    </div>
  </footer>
  </div>
}