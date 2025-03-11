import { generalInfoSchema, generalInfoValues } from "@/lib/validaton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl,FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

export default function GeneralInfoForm({resumeData, setResumeData}: EditorFormProps) {
  const form = useForm<generalInfoValues>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      title: resumeData.title || "",
      description: resumeData.description || "",
    },
  });

    useEffect(() => {
          const { unsubscribe } = form.watch(async (values) => {
              const isValid = await form.trigger();
              if (!isValid) return;
              setResumeData({...resumeData, ...values});
          });
  
          return () => unsubscribe();
      },[form, resumeData, setResumeData]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">General Information</h2>
        <p className="text-muted-foreground">
          Fill in the form below to create your resume, your progress will be
          saved automatically.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Project Name" autoFocus />
                </FormControl>
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Description" autoFocus />
                </FormControl>
                <FormDescription>
                Describe of the resume you are working on.
                </FormDescription>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}


