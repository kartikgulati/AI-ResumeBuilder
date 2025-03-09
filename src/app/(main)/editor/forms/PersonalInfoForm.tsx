import {useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema, personalInfoValues } from "@/lib/validaton";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";




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
    });

    useEffect(() => {
        const { unsubscribe } = form.watch(async () => {
            const isValid = await form.trigger();
            if (!isValid) return;
            
        });

        return () => unsubscribe();
    },[form])

    return <div className="mx-auto max-w-xl ">
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

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-3">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                            control={form.control}
                            name="jobTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                <div className="grid grid-cols-2 gap-3">
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                </form>
            </Form>

    </div>
};