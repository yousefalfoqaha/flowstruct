import {Section, StudyPlan} from "@/types";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useToast} from "@/shared/hooks/useToast.ts";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shared/components/ui/form.tsx";
import {Input} from "@/shared/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shared/components/ui/select.tsx";
import {ButtonLoading} from "@/shared/components/ButtonLoading.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {editSectionFormSchema} from "@/form-schemas/sectionFormSchema.ts";
import {useParams} from "@tanstack/react-router";
import {useDialog} from "@/shared/hooks/useDialog.ts";

export function EditSectionDialog() {
    const {studyPlanId} = useParams({strict: false});
    const {dialogIsOpen, closeDialog, item: section} = useDialog<Section>();

    const queryClient = useQueryClient();
    const {toast} = useToast();

    const form = useForm<z.infer<typeof editSectionFormSchema>>({
        resolver: zodResolver(editSectionFormSchema),
        defaultValues: {...section}
    });

    const mutation = useMutation({
        mutationFn: async (updatedSection: z.infer<typeof editSectionFormSchema>) => {
            const response = await fetch(`http://localhost:8080/api/v1/study-plans/${studyPlanId}/sections/${section?.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedSection)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An unknown error occurred');
            }

            return response.json();
        },
        onSuccess: ((updatedStudyPlan: StudyPlan) => {
            queryClient.setQueryData(["study-plan", updatedStudyPlan.id], updatedStudyPlan);
            closeDialog();
            toast({description: 'Successfully updated section.'});
        }),
        onError: (error) => toast({description: error.message, variant: 'destructive'})
    });

    return (
        <Dialog open={dialogIsOpen('EDIT')} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Section</DialogTitle>
                    <DialogDescription>
                        Edit the section details below.
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
                                                    <SelectValue/>
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
                                                    <SelectValue/>
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
                                            <Input {...field} type="number" value={field.value ?? undefined}
                                                   autoComplete="off"/>
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
                                            <Input {...field}
                                                   placeholder='Eg. "General Track Special Courses"'
                                                   autoComplete="off"
                                                   value={field.value ?? ''}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {mutation.isPending ? <ButtonLoading/> : <Button type="submit">Update Section</Button>}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}