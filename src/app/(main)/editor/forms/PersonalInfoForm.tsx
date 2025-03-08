import {useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema, personalInfoValues } from "@/lib/validaton";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function PersonalInfoForm() {
    const form = useForm<personalInfoValues>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            photo: undefined,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            city: "",
            jobTitle: "",
        }
    })

    return <div className="mx-auto max-w-xl space-y-6">
        <div className="space-y-1.5 text-center">
            <h2 className="text-2xl font-semibold">Personal Information</h2>
            <p className="text-muted-foreground text-sm">
                Fill in the form below to create your resume, your progress will be saved automatically.
            </p>
            </div>

            <Form {...form}>
                <form className="space-y-3">
                    <FormField
                        control={form.control}
                        name="photo"
                        render={({ field:{value, ...fieldValues} }) => (
                            <FormItem>
                                <FormLabel>Photo</FormLabel>
                                <FormControl>
                                    <Input {...fieldValues} type="file" accept="image/*" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {const file = e.target.files?.[0]; fieldValues.onChange(file)} }/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>

            </Form>

    </div>
};