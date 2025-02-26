"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import GeneralInfoForm from "./forms/GeneralInfoForm";

export default function ResumeEditor() {
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
          <div className="w-full p-3 md:w-1/2">
          <GeneralInfoForm />
            </div>
          <div className="grow md:border-r" />
          {/* resume preview goes to right */}
          <div className="hidden w-1/2 md:flex">right</div>
        </div>
      </main>
      <footer className="w-full border-t px-3 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
          <div className="flex gap-3 items-center">
            <Button variant="secondary">Previous Step</Button>
            <Button>Next Step</Button>
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
  );
}
