import React from "react";
import {useToast} from "@/hooks/use-toast.ts";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {StudyPlan} from "@/types";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {ButtonLoading} from "@/components/ButtonLoading.tsx";
import {createSectionFormSchema} from "@/form-schemas/sectionFormSchema.ts";
import {useParams} from "@tanstack/react-router";
import {useStudyPlan} from "@/hooks/useStudyPlan.ts";

export function CreateSectionDialog() {
    const [isOpen, setIsOpen] = React.useState(false);
    const {toast} = useToast();
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? '');
    const {data: studyPlan} = useStudyPlan(studyPlanId);

    const form = useForm<z.infer<typeof createSectionFormSchema>>({
        resolver: zodResolver(createSectionFormSchema),
        defaultValues: {
            level: undefined,
            type: undefined,
            requiredCreditHours: 0,
            name: ''
        }
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newSection: z.infer<typeof createSectionFormSchema>) => {
            const response = await fetch(`http://localhost:8080/api/v1/study-plans/${studyPlan.id}/create-section`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newSection)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An unknown error occurred');
            }

            return response.json();
        },
        onSuccess: ((updatedStudyPlan: StudyPlan) => {
            queryClient.setQueryData(["study-plan", updatedStudyPlan.id], updatedStudyPlan);
            setIsOpen(false);
            toast({description: 'Successfully created section.'});
        }),
        onError: (error) => {
            toast({
                description: error.message,
                variant: 'destructive'
            });
        }
    });

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button onClick={() => setIsOpen(true)}>
                <Plus/> Create Section
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Section</DialogTitle>
                    <DialogDescription>
                        Create a section to categorize courses.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((formData) =>
                        mutation.mutate(formData)
                    )} className="space-y-6">
                        <div className="flex gap-3">
                            <FormField
                                control={form.control}
                                name="level"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Level*</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="University">University</SelectItem>
                                                    <SelectItem value="School">School</SelectItem>
                                                    <SelectItem value="Program">Program</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Type*</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Requirement">Requirement</SelectItem>
                                                    <SelectItem value="Elective">Elective</SelectItem>
                                                    <SelectItem value="Remedial">Remedial</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex gap-3">
                            <FormField
                                control={form.control}
                                name="requiredCreditHours"
                                render={({field}) => (
                                    <FormItem className="w-fit">
                                        <FormLabel className="text-nowrap">Required Cr. Hrs*</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" value={field.value ?? undefined} autoComplete="off"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder='Eg. "General Track Special Courses"' autoComplete="off"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {mutation.isPending ? <ButtonLoading/> : <Button type="submit">Create Program</Button>}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}