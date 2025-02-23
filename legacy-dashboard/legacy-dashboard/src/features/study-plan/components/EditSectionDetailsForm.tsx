import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shared/components/ui/form.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shared/components/ui/select.tsx";
import {Input} from "@/shared/components/ui/input.tsx";
import {ButtonLoading} from "@/shared/components/ButtonLoading.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {editSectionFormSchema} from "@/features/study-plan/form-schemas.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useQueryClient} from "@tanstack/react-query";
import {Section} from "@/features/study-plan/types.ts";
import {useDialog} from "@/shared/hooks/useDialog.ts";
import {toast} from "@/shared/hooks/useToast.ts";
import {useParams} from "@tanstack/react-router";
import {useEditSectionDetailsForm} from "@/features/study-plan/hooks/useEditSectionDetailsForm.ts";
import {useEditSectionDetails} from "@/features/study-plan/hooks/useEditSectionDetails.ts";

export function EditSectionDetailsForm({section}: { section: Section }) {
    const form = useEditSectionDetailsForm(section);
    const editSectionDetails = useEditSectionDetails();

    const {closeDialog} = useDialog<Section>();
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? '');

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((formData) =>
                editSectionDetails.mutate({
                    updatedSectionDetails: formData,
                    sectionId: section.id,
                    studyPlanId: studyPlanId
                }, {onSuccess: () => closeDialog()})
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

                {editSectionDetails.isPending ? <ButtonLoading/> : <Button type="submit">Update Section</Button>}
            </form>
        </Form>
    );
}