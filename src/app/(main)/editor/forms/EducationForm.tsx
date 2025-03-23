import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { EditorFormProps } from "@/lib/types";
import { educationSchema, educationValues } from "@/lib/validaton";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";

export default function EducationForm({resumeData, setResumeData}: EditorFormProps){ 
        const form = useForm<educationValues>({
            resolver: zodResolver(educationSchema),
            defaultValues: {
                educations: resumeData.educations || [],
            },
        });

          useEffect(() => {
            const { unsubscribe } = form.watch(async (values) => {
              const isValid = await form.trigger();
              if (!isValid) return;
              setResumeData({
                ...resumeData,
                educations:
                  values.educations?.filter((exp) => exp !== undefined) || [],
              });
            });
        
            return () => unsubscribe();
          }, [form, resumeData, setResumeData]);
        
          const { fields, append, remove } = useFieldArray({
            control: form.control,
            name: "educations",
          });
        
        
    return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold"> Education </h2>
        <p className="text-muted-foreground">
          Add your Education qualifications.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-3">
          {fields.map((field, index) => (
            <EducationItem 
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
                  degree: "",
                  school: "",
                  startDate: "",
                  endDate: "",
                 
                })
              }
              className="btn btn-primary"
            >
              Add Education Information
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface EducationItemProps{
  form: UseFormReturn<educationValues>;
  index: number;
  remove: (index: number) => void;

}


    function EducationItem({form, index, remove}: EducationItemProps) {
        return <div className="space-y-3 border rounded-md bg-background p-3">
          <div className="flex justify-between gap-2">
          <span className="font-semibold">Education {index + 1}</span>
          <GripHorizontal className="size-5 cursor-grab texr-mute-foreground" onClick={() => remove(index)}/>
          </div>


          <FormField
      control={form.control}
      name={`educations.${index}.degree`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Degree</FormLabel>
          <FormControl>
            <Input {...field} autoFocus/>
          </FormControl>
        </FormItem>
      )}
    />

<FormField
      control={form.control}
      name={`educations.${index}.school`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>School</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
        </FormItem>
      )}
    />
<div className="grid grid-cols-2 gap-2">
<FormField
      control={form.control}
      name={`educations.${index}.startDate`}
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
      name={`educations.${index}.endDate`}
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
      Leave the end date empty if you are currently in school.
    </FormDescription>

    <Button type="button" onClick={() => remove(index)} variant="destructive">
      Remove</Button>

    </div>;
    }