import {StudyPlanOption} from "@/types";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {editStudyPlanFormSchema} from "@/form-schemas/studyPlanFormSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useToast} from "@/hooks/use-toast.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {ButtonLoading} from "@/components/ButtonLoading.tsx";
import {useStudyPlan} from "@/hooks/useStudyPlan.ts";
import {useDialog} from "@/hooks/useDialog.ts";


export function EditStudyPlanDialog() {
    const {dialogIsOpen, item: studyPlan, closeDialog} = useDialog<StudyPlanOption>();
    const {editStudyPlan} = useStudyPlan();
    const {toast} = useToast();

    const form = useForm<z.infer<typeof editStudyPlanFormSchema>>({
        resolver: zodResolver(editStudyPlanFormSchema),
        defaultValues: {...studyPlan}
    });

    return (
        <Dialog open={dialogIsOpen('EDIT')} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Study Plan</DialogTitle>
                    <DialogDescription>
                        Make changes to the study plan overview.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((formData) =>
                        editStudyPlan.mutate(formData, {
                            onSuccess: () => {
                                closeDialog();
                                toast({description: 'Study plan updated successfully.'});
                            }
                        })
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

                        {editStudyPlan.isPending ? <ButtonLoading/> : <Button type="submit">Save Changes</Button>}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}