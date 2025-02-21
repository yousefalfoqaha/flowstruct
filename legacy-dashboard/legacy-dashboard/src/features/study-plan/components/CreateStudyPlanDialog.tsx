import React from "react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/shared/components/ui/dialog.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shared/components/ui/form.tsx";
import {Input} from "@/shared/components/ui/input.tsx";
import {ButtonLoading} from "@/shared/components/ButtonLoading.tsx";
import {useCreateStudyPlanForm} from "@/features/study-plan/hooks/useCreateStudyPlanForm.ts";
import {useCreateStudyPlan} from "@/features/study-plan/hooks/useCreateStudyPlan.ts";

export function CreateStudyPlanDialog({programId}: {programId: number}) {
    const [isOpen, setIsOpen] = React.useState(false);

    const createStudyPlan = useCreateStudyPlan();
    const form = useCreateStudyPlanForm();

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
                        createStudyPlan.mutate({
                            createdStudyPlanDetails: formData,
                            programId: programId
                        }, {onSuccess: () => setIsOpen(false)})
                    )} className="space-y-6">
                        <div className="flex gap-3">
                            <FormField
                                control={form.control}
                                name="year"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Year*</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number"
                                                   placeholder={new Date().getFullYear().toString()}
                                                   autoComplete="off"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="duration"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="text-nowrap">Duration* (in years)</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="number" value={field.value ?? undefined}
                                                   autoComplete="off"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="track"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormLabel>Track</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value ?? undefined}
                                               placeholder='Eg:. "General Track"' autoComplete="off"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {createStudyPlan.isPending
                            ? <ButtonLoading/>
                            : <Button type="submit">Create Study Plan</Button>
                        }
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}