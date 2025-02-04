import {StudyPlanOption} from "@/types";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {editStudyPlanFormSchema} from "@/form-schemas/studyPlanFormSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useToast} from "@/hooks/use-toast.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {ButtonLoading} from "@/components/ButtonLoading.tsx";

type EditStudyPlanProps = {
    studyPlan: StudyPlanOption | null;
    closeDialog: () => void;
}

export function EditStudyPlanDialog({studyPlan, closeDialog}: EditStudyPlanProps) {
    const form = useForm<z.infer<typeof editStudyPlanFormSchema>>({
        resolver: zodResolver(editStudyPlanFormSchema),
        defaultValues: {...studyPlan}
    });

    const {toast} = useToast();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (updatedStudyPlan: z.infer<typeof editStudyPlanFormSchema>) => {
            const response = await fetch(`http://localhost:8080/api/v1/study-plans/${updatedStudyPlan.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedStudyPlan)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred.');
            }
        },
        onSuccess: (_, updatedStudyPlan) => {
            queryClient.setQueryData(['study-plans', updatedStudyPlan.program], (oldStudyPlans: StudyPlanOption[] | undefined) => {
                if (!oldStudyPlans) return [];

                return oldStudyPlans.map(sp => (
                        sp.id === updatedStudyPlan.id
                            ? updatedStudyPlan
                            : sp
                    )
                );
            });

            closeDialog();

            toast({description: 'Study plan updated successfully.'});
        },
        onError: (error) => {
            toast({
                description: error.message,
                variant: 'destructive'
            });
        }
    });

    return (
        <Dialog open={!!studyPlan} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Program</DialogTitle>
                    <DialogDescription>
                        Make changes to the program here. This will affect its study plans.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((formData) =>
                        mutation.mutate(formData)
                    )} className="space-y-6">
                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="year"
                                render={({field}) => (
                                    <FormItem className="w-32">
                                        <FormLabel>Year</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} autoComplete="off"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="track"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Track</FormLabel>
                                        <FormControl>
                                            <Input{...field} autoComplete="off"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-center">
                            {mutation.isPending ? <ButtonLoading/> : <Button type="submit">Save Changes</Button>}
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}