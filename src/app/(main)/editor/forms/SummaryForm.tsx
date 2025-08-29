import { EditorFormProps } from "@/lib/types";
import { summarySchema, summaryValues } from "@/lib/validaton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import GenerateSummaryButton from "./GenerateSummaryButton";

export default function SummaryForm({resumeData,setResumeData}: EditorFormProps){
  const form = useForm<summaryValues>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData.summary || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,...values
      });
    });
  
      return () => unsubscribe();
    }, [form, resumeData, setResumeData]);


    return (
      <div className="max-w-xl mx-auto space-y-6">
        <div className="space-y-1.5 text-center">
          <h2 className="text-2xl font-semibold">Summary </h2>
          <p className="text-muted-foreground">
            Add your summary.
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-3">
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Your Skills</FormLabel>
                  <FormControl>
                   <Textarea {...field}
                   placeholder="Enter summary here..."
                    />
                  </FormControl>
                  <FormDescription>
                    Enter a brief summary about yourself.
                  </FormDescription>
                  <FormMessage />
                  <GenerateSummaryButton
                  resumeData={resumeData}
                  onSummaryGenerated={(summary) => form.setValue("summary",summary)}/>
                </FormItem>
              )}
            />
          </form>
          </Form>

        </div>
    );

} 

