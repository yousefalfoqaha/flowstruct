import {StudyPlan} from "@/features/study-plan/types.ts";
import {useAppForm} from "@/shared/hooks/useAppForm.ts";
import {studyPlanDetailsSchema} from "@/features/study-plan/schemas.ts";
import {AppCard} from "@/shared/components/AppCard.tsx";
import {StudyPlanDetailsFormFields} from "@/features/study-plan/components/StudyPlanDetailsFormFields.tsx";
import {Link, useNavigate} from "@tanstack/react-router";
import {Button, Text} from "@mantine/core";
import {ChevronLeft, Pencil, Trash} from "lucide-react";
import {getDefaultSearchValues} from "@/utils/getDefaultSearchValues.ts";
import {useEditStudyPlanDetails} from "@/features/study-plan/hooks/useEditStudyPlanDetails.ts";
import {useDeleteStudyPlan} from "@/features/study-plan/hooks/useDeleteStudyPlan.ts";
import {modals} from "@mantine/modals";

type Props = {
    studyPlan: StudyPlan;
}

export function EditStudyPlanDetailsFieldset({studyPlan}: Props) {
    const form = useAppForm(studyPlanDetailsSchema, {
        program: String(studyPlan.program),
        year: new Date(studyPlan.year, 0, 1),
        duration: studyPlan.duration,
        track: studyPlan.track,
        isPrivate: studyPlan.isPrivate
    });

    const editStudyPlanDetails = useEditStudyPlanDetails();
    const deleteStudyPlan = useDeleteStudyPlan();

    const navigate = useNavigate();

    const onSubmit = form.handleSubmit(data => {
        editStudyPlanDetails.mutate({
            studyPlanId: studyPlan.id,
            updatedStudyPlanDetails: {
                ...data,
                year: data.year.getFullYear(),
                program: Number(data.program)
            }
        }, {
            onSuccess: () => {
                navigate({
                    to: '/study-plans/$studyPlanId/details',
                    params: {studyPlanId: String(studyPlan.id)}
                })
            }
        });
    });

    const handleDelete = () => deleteStudyPlan.mutate(studyPlan.id, {
            onSuccess: () => navigate({
                to: '/study-plans',
                search: getDefaultSearchValues()
            })
        }
    );

    const footer = (
        <>
            <Button
                variant="filled"
                color="red"
                leftSection={<Trash size={18}/>}
                onClick={() =>
                    modals.openConfirmModal({
                        title: 'Please confirm your action',
                        children: (
                            <Text size="sm">
                                Deleting this study plan will delete all of its sections, program map, and
                                overview, are you absolutely
                                sure?
                            </Text>
                        ),
                        labels: {confirm: 'Confirm', cancel: 'Cancel'},
                        onConfirm: handleDelete
                    })}
                loading={deleteStudyPlan.isPending}
            >
                Delete Study plan
            </Button>

            <Button
                type="submit"
                leftSection={<Pencil size={18}/>}
                loading={editStudyPlanDetails.isPending}
            >
                Update Details
            </Button>
        </>
    );

    return (
        <form onSubmit={onSubmit}>
            <AppCard
                title="Study Plan Information"
                subtitle="Update the details for this study plan"
                footer={footer}
                headerAction={
                    <Link
                        to="/study-plans/$studyPlanId/details"
                        params={{studyPlanId: String(studyPlan.id)}}
                    >
                        <Button variant="default" leftSection={<ChevronLeft size={18}/>}>
                            Back
                        </Button>
                    </Link>
                }
            >
                <StudyPlanDetailsFormFields disableProgramSelect={true} form={form}/>
            </AppCard>
        </form>
    );
}
