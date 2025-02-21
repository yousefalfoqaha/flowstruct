import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shared/components/ui/form.tsx";
import {Input} from "@/shared/components/ui/input.tsx";
import {ButtonLoading} from "@/shared/components/ButtonLoading.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {useEditStudyPlanDetails} from "@/features/study-plan/hooks/useEditStudyPlanDetails.ts";
import {useEditStudyPlanDetailsForm} from "@/features/study-plan/hooks/useEditStudyPlanDetailsForm.ts";
import {StudyPlanListItem} from "@/features/study-plan/types.ts";
import {useDialog} from "@/shared/hooks/useDialog.ts";

export function EditStudyPlanDetailsForm() {
    const {closeDialog, item: studyPlan} = useDialog<StudyPlanListItem>();
    const editStudyPlanDetails = useEditStudyPlanDetails();
    const form = useEditStudyPlanDetailsForm(studyPlan);

    if (!studyPlan) return;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((formData) =>
                editStudyPlanDetails.mutate({
                    studyPlanId: studyPlan.id,
                    updatedStudyPlanDetails: formData
                }, {onSuccess: () => closeDialog()})
            )} className="space-y-6">
                <div className="flex gap-3">
                    <FormField
                        control={form.control}
                        name="year"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormLabel>Year*</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="number"
                                        autoComplete="off"
                                        value={field.value ?? ""}
                                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")}
                                    />
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
                                    <Input
                                        {...field}
                                        type="number"
                                        autoComplete="off"
                                        value={field.value ?? ""}
                                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")}
                                    />
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
                                <Input {...field}
                                       value={field.value ?? ""}
                                       placeholder='Eg:. "General Track"'
                                       autoComplete="off"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {editStudyPlanDetails.isPending
                    ? <ButtonLoading/>
                    : <Button type="submit">Save Changes</Button>
                }
            </form>
        </Form>
    );
}