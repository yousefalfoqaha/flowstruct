import React from "react";
import {useToast} from "@/hooks/use-toast.ts";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ProgramOption, StudyPlanOption} from "@/types";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {ButtonLoading} from "@/components/ButtonLoading.tsx";
import {createStudyPlanFormSchema} from "@/form-schemas/studyPlanFormSchema.ts";

type CreateStudyPlanDialogProps = {
    program: ProgramOption;
};

export function CreateStudyPlanDialog({program}: CreateStudyPlanDialogProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const {toast} = useToast();

    const form = useForm<z.infer<typeof createStudyPlanFormSchema>>({
        resolver: zodResolver(createStudyPlanFormSchema),
        defaultValues: {
            year: undefined,
            track: '',
            isPrivate: true,
            program: program.id
        }
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newStudyPlan: z.infer<typeof createStudyPlanFormSchema>) => {
            const response = await fetch('http://localhost:8080/api/v1/study-plans', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newStudyPlan)
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An unknown error occurred');
            }

            return response.json();
        },
        onSuccess: (_, newStudyPlan) => {
            queryClient.setQueryData(['study-plans', program.id], (studyPlans: StudyPlanOption[] | undefined) => {
                if (!studyPlans) return [];
                return [...studyPlans, newStudyPlan];
            });

            setIsOpen(false);

            toast({description: "Study plan created successfully."});
        },
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
                <Plus/> Create Study Plan
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Study Plan</DialogTitle>
                    <DialogDescription>
                        This study plan will be private by default.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((formData) =>
                        mutation.mutate(formData)
                    )} className="space-y-6">
                        <div className="flex gap-3">
                            <FormField
                                control={form.control}
                                name="year"
                                render={({field}) => (
                                    <FormItem className="w-32">
                                        <FormLabel>Year*</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" autoComplete="off"/>
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
                                            <Input {...field} value={field.value ?? ''} autoComplete="off"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {mutation.isPending ? <ButtonLoading/> : <Button type="submit">Create Study Plan</Button>}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}