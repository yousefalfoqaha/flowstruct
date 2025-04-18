import {StudyPlan} from "@/features/study-plan/types.ts";
import {useAppForm} from "@/shared/hooks/useAppForm.ts";
import {studyPlanDetailsSchema} from "@/features/study-plan/schemas.ts";
import {AppCard} from "@/shared/components/AppCard.tsx";
import {StudyPlanDetailsFormFields} from "@/features/study-plan/components/StudyPlanDetailsFormFields.tsx";
import {Link, useNavigate} from "@tanstack/react-router";
import {Button} from "@mantine/core";
import {Pencil, Trash} from "lucide-react";
import {getDefaultSearchValues} from "@/lib/getDefaultSearchValues.ts";
import {useEditStudyPlanDetails} from "@/features/study-plan/hooks/useEditStudyPlanDetails.ts";

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
                    to: '/study-plans/$studyPlanId',
                    params: {studyPlanId: String(studyPlan.id)}
                })
            }
        });
    });

    const footer = (
        <>
            <Link search={getDefaultSearchValues()} to="/study-plans">
                <Button variant="filled" color="red" leftSection={<Trash size={18}/>}>
                    Delete Study plan
                </Button>
            </Link>

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
            >
                <StudyPlanDetailsFormFields disableProgramSelect={true} form={form}/>
            </AppCard>
        </form>
    );
}
