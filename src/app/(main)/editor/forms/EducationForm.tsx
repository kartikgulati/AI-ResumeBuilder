import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { EditorFormProps } from "@/lib/types";
import { educationSchema, educationValues } from "@/lib/validaton";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";


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
        
          const { fields, append, remove, move } = useFieldArray({
            control: form.control,
            name: "educations",
          });

          const sensors = useSensors(
            useSensor(PointerSensor),
            useSensor(KeyboardSensor, {
              coordinateGetter: sortableKeyboardCoordinates,
            }),
          );

          function handleDragEnd(event: DragEndEvent) {
            const { active, over } = event;
        
            if (over && active.id !== over.id) {
              const oldIndex = fields.findIndex((field) => field.id === active.id);
              const newIndex = fields.findIndex((field) => field.id === over.id);
              move(oldIndex, newIndex);
              return arrayMove(fields, oldIndex, newIndex);
            }
          }
        
        
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

        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={fields}
              strategy={verticalListSortingStrategy}
            >

          {fields.map((field, index) => (
            <EducationItem 
            id={field.id} 
            key={field.id} 
            index={index}
            form={form}
            remove={remove}
            />
          ))}

        </SortableContext>
        </DndContext>
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


    function EducationItem({id, form, index, remove}: EducationItemProps) {
      const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
      } = useSortable({ id });
    
        return <div className={cn("space-y-3 border rounded-md bg-background p-3",isDragging && "relative z-50 cursor-grab shadow-xl",)}
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,}}>
          <div className="flex justify-between gap-2">
          <span className="font-semibold">Education {index + 1}</span>
          <GripHorizontal className="size-5 cursor-grab texr-mute-foreground focus:outline-none" onClick={() => remove(index)}
                      {...attributes}
                      {...listeners}/>
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