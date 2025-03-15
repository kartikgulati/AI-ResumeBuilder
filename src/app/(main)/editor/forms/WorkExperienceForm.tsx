import { EditorFormProps } from "@/lib/types";
import { workExperienceSchema, workExperienceValues } from "@/lib/validaton";
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
      setResumeData({
        ...resumeData,
        workExperienceSchema:
          values.workExperiences?.filter((exp) => exp !== undefined) || [],
      });
    });

    return () => unsubscribe();
  }, [form, resumeData, setResumeData]);

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  function remove(index: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Work Experiences </h2>
        <p className="text-muted-foreground">
          Add your work experiences below.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-3">
          {fields.map((field, index) => (
            <WorkExperienceItem 
            key={field.id} 
            index={index}
            form={form}
            remove={remove}
            />
          ))}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  position: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
              className="btn btn-primary"
            >
              Add Work Experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface WorkExperienceItemProps {
  form: UseFormReturn<workExperienceValues>;
  index: number;
  remove: (index: number) => void;


}

function WorkExperienceItem({form, index, remove}: WorkExperienceItemProps) {
  return <div className="space-y-3 border rounded-md bg-background p-3">
    <div className="flex justify-between gap-2">
    <span className="font-semibold">Work Experience {index + 1}</span>
    <GripHorizontal className="size-5 cursor-grab texr-mute-foreground" onClick={() => remove(index)}/>
    </div>
    
    <FormField
      control={form.control}
      name={`workExperiences.${index}.position`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Position</FormLabel>
          <FormControl>
            <Input {...field} autoFocus/>
          </FormControl>
        </FormItem>
      )}
    />

<FormField
      control={form.control}
      name={`workExperiences.${index}.company`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Company</FormLabel>
          <FormControl>
            <Input {...field} autoFocus/>
          </FormControl>
        </FormItem>
      )}
    />

    <div className="grid grid-cols-2 gap-2">

    <FormField
      control={form.control}
      name={`workExperiences.${index}.startDate`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Start Date</FormLabel>
          <FormControl>
            <Input {...field}
            type="date"
            value={field.value?.slice(0,10)} 
            autoFocus/>
          </FormControl>
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name={`workExperiences.${index}.endDate`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>End Date</FormLabel>
          <FormControl>
            <Input {...field} 
            type="date"
            value={field.value?.slice(0,10)}
            autoFocus/>
          </FormControl>
        </FormItem>
      )}
    />
    </div>
    <FormDescription className="text-muted-foreground text-center"> 
      Leave the end date empty if you are currently working here.
    </FormDescription>

    <FormField
      control={form.control}
      name={`workExperiences.${index}.description`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea {...field} 
            
            autoFocus/>
          </FormControl>
        </FormItem>
      )}
    />

    <Button type="button" onClick={() => remove(index)} variant="destructive">
      Remove</Button>

  </div>;
}
