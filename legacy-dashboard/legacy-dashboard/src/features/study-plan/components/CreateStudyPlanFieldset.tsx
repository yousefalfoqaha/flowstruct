import {AppCard} from "@/shared/components/AppCard.tsx";
import {StudyPlanDetailsFormFields} from "@/features/study-plan/components/StudyPlanDetailsFormFields.tsx";
import {useAppForm} from "@/shared/hooks/useAppForm.ts";
import {studyPlanDetailsSchema} from "@/features/study-plan/schemas.ts";
import {useCreateStudyPlan} from "@/features/study-plan/hooks/useCreateStudyPlan.ts";
import {Link, useNavigate} from "@tanstack/react-router";
import {getDefaultSearchValues} from "@/utils/getDefaultSearchValues.ts";
import {Button} from "@mantine/core";
import {Plus, X} from "lucide-react";

export function CreateStudyPlanFieldset() {
    const form = useAppForm(studyPlanDetailsSchema, {
        isPrivate: true,
        year: new Date().toISOString(),
        track: '',
        duration: 4
    });

    const createStudyPlan = useCreateStudyPlan();
    const navigate = useNavigate();

    const onSubmit = form.handleSubmit(data => {
        createStudyPlan.mutate({
            studyPlanDetails: {
                ...data,
                year: Number(data.year.split('-')[0]),
                program: Number(data.program)
            },
        }, {
            onSuccess: () => {
                form.reset();
                navigate({to: '/study-plans', search: getDefaultSearchValues()});
            }
        });
    });

    const footer = (
        <>
            <Link search={getDefaultSearchValues()} to="/study-plans">
                <Button variant="default" leftSection={<X size={18}/>}>
                    Cancel
                </Button>
            </Link>

            <Button
                type="submit"
                leftSection={<Plus size={18}/>}
                loading={createStudyPlan.isPending}
            >
                Save Study Plan
            </Button>
        </>
    );

    return (
        <form onSubmit={onSubmit}>
            <AppCard
                title="Study Plan Details"
                subtitle="Enter the details for the new study plan here"
                footer={footer}
            >
                <StudyPlanDetailsFormFields form={form}/>
            </AppCard>
        </form>
    );
}