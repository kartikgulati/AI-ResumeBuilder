import { EditorFormProps } from "@/lib/types";
import { skillsSchema, SkillsValues,  } from "@/lib/validaton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import ResumeEditor from "../ResumeEditor";
import { useEffect } from "react";
import exp from "constants";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GripHorizontal } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function SkillsForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<SkillsValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: resumeData.skills || [],
    },
  });


  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        skills:
          values.skills
            ?.filter((skill) => skill !== undefined)
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "") || [],
      });
    });
  
      return () => unsubscribe();
    }, [form, resumeData, setResumeData]);

    return (
      <div className="max-w-xl mx-auto space-y-6">
        <div className="space-y-1.5 text-center">
          <h2 className="text-2xl font-semibold">Skills </h2>
          <p className="text-muted-foreground">
            Add your skills.
          </p>
        </div>
        </div>
    );
  }
