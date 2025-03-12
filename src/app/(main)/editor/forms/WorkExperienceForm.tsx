import { EditorFormProps } from "@/lib/types";
import { workExperienceSchema, workExperienceValues } from "@/lib/validaton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import ResumeEditor from "../ResumeEditor";
import { useEffect } from "react";
import exp from "constants";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function WorkExperienceForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<workExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
    },
  });

   useEffect(() => {
            const { unsubscribe } = form.watch(async (values) => {
                const isValid = await form.trigger();
                if (!isValid) return;
                setResumeData({...resumeData, workExperienceSchema: values.workExperiences?.filter((exp) => exp !== undefined) || []});
            });
    
            return () => unsubscribe();
        },[form, resumeData, setResumeData]);

        const {fields, append} = useFieldArray({
            control: form.control,
            name: "workExperiences",
        })

        return (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="space-y-1.5 text-center">
            <h2 className="text-2xl font-semibold">Work Experiences </h2>
            <p className="text-muted-foreground">
              Add your work experiences below.
            </p>
          </div>
        </div>
        );

        <Form {...form}>
          <form className="space-y-3">
            {fields.map((field) => (
                <WorkExperienceItem key={field.id}/>
            ))}
            <div className="flex justify-center">
                <button
                type="button"
                onClick={() => append({position: "", company: "", startDate: "", endDate: "", description: ""})}
                className="btn btn-primary"
                >
                    Add Work Experience
                </button>
            </div>
          </form>
        </Form>



}
