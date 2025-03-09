"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import { resumeValues } from "@/lib/validaton";
import { useState } from "react";

export default function ResumeEditor() {

  const searchParams = useSearchParams();

  const [resumeData, setResumeData] = useState<ResumeValues>({})

  const currentStep = searchParams.get("step") || steps[0].key;

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState({}, "", `?${newSearchParams.toString()}`);
    
  }

  const FormComponent = steps.find((step) => step.key === currentStep)?.component;


  return (
    <div className=" flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className=" text-2xl font-bold">Design your dream resume</h1>
        <p className="test-sm text-muted-foreground">
          Fill in the form below to create your resume, your progress will be
          saved automatically.
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute botton-0 top-0 flex w-full">
          {/* form elements go to left */}
          <div className="w-full p-3 md:w-1/2 overflow-y-auto">
          <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
          {FormComponent && <FormComponent />}
            </div>

          <div className="grow md:border-r" />
          
          {/* resume preview goes to right */}
          <div className="hidden w-1/2 md:flex">right</div>
        </div>
      </main>
      <Footer currentStep={currentStep} setCurrentStep={setStep}/>
    </div>
  );
}

