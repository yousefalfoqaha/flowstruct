import {useEditStudyPlanDetails} from "@/features/study-plan/hooks/useEditStudyPlanDetails.ts";
import {modals} from "@mantine/modals";
import {StudyPlanListItem} from "@/features/study-plan/types.ts";
import {useForm} from "react-hook-form";
import {studyPlanDetailsSchema, StudyPlanDetailsFormValues} from "@/features/study-plan/form-schemas.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {StudyPlanDetailsFormFields} from "@/features/study-plan/components/StudyPlanDetailsFormFields.tsx";
import {Button, Flex, LoadingOverlay} from "@mantine/core";

export function EditStudyPlanDetailsModal({studyPlan}: { studyPlan: StudyPlanListItem }) {
    const editStudyPlanDetails = useEditStudyPlanDetails();
    const {control, handleSubmit, formState: {errors}} = useForm<StudyPlanDetailsFormValues>({
        resolver: zodResolver(studyPlanDetailsSchema),
        defaultValues: {...studyPlan, year: new Date(studyPlan.year, 0, 1)}
    });

    const onSubmit = (data: StudyPlanDetailsFormValues) => {
        editStudyPlanDetails.mutate({
            studyPlanId: studyPlan.id,
            updatedStudyPlanDetails: {...data, year: data.year.getFullYear()}
        }, {onSuccess: () => modals.closeAll()});
    }

    if (!studyPlan) return;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Flex direction="column" gap="md">
                <LoadingOverlay visible={editStudyPlanDetails.isPending} zIndex={1000}
                                overlayProps={{radius: "sm", blur: 2}}/>
                <StudyPlanDetailsFormFields control={control} errors={errors}/>
                <Button type="submit">Save Changes</Button>
            </Flex>
        </form>
    );
}