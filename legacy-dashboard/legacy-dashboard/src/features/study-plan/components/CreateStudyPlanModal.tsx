import {Plus} from "lucide-react";
import {useCreateStudyPlan} from "@/features/study-plan/hooks/useCreateStudyPlan.ts";
import {Modal, Button, Flex} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useForm} from "react-hook-form";
import {StudyPlanDetailsFormValues, studyPlanDetailsSchema} from "@/features/study-plan/form-schemas.ts";
import {modals} from "@mantine/modals";
import {zodResolver} from "@hookform/resolvers/zod";
import {StudyPlanDetailsFormFields} from "@/features/study-plan/components/StudyPlanDetailsFormFields.tsx";

export function CreateStudyPlanModal({programId}: { programId: number }) {
    const [opened, {open, close}] = useDisclosure(false);

    const {control, handleSubmit, formState: {errors}} = useForm<StudyPlanDetailsFormValues>({
        resolver: zodResolver(studyPlanDetailsSchema),
        defaultValues: {
            year: undefined,
            duration: undefined,
            track: null
        }
    });

    const createStudyPlan = useCreateStudyPlan();

    const onSubmit = (data: StudyPlanDetailsFormValues) => {
        console.log(data);
        createStudyPlan.mutate({
            createdStudyPlanDetails: data,
            programId: programId
        }, {onSuccess: () => modals.closeAll()});
        close();
    };

    return (
        <>
            <Modal opened={opened} onClose={close} title="Create New Study Plan" centered>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex direction="column" gap="md">
                        <StudyPlanDetailsFormFields control={control} errors={errors}/>
                        <Button type="submit">Create Study Plan</Button>
                    </Flex>
                </form>
            </Modal>

            <Button onClick={open} leftSection={<Plus size={14}/>}>
                Create Study Plan
            </Button>
        </>
    );
}
