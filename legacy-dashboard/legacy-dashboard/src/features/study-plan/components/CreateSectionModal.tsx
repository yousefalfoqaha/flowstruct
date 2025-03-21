import {useCreateSection} from "@/features/study-plan/hooks/useCreateSection.ts";
import {useParams} from "@tanstack/react-router";
import {useForm} from "react-hook-form";
import {SectionDetailsFormValues, sectionDetailsSchema} from "@/features/study-plan/form-schemas.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Flex, LoadingOverlay, Modal, Button, ActionIcon} from "@mantine/core";
import {SectionDetailsFormFields} from "@/features/study-plan/components/SectionDetailsFormFields.tsx";
import {useDisclosure} from "@mantine/hooks";
import {Plus} from "lucide-react";

export function CreateSectionModal() {
    const {
        handleSubmit,
        control,
        reset,
        getValues,
        formState: {errors}
    } = useForm<SectionDetailsFormValues>({
        resolver: zodResolver(sectionDetailsSchema)
    });

    const createSection = useCreateSection();
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? "");

    const [opened, { open, close }] = useDisclosure(false);

    const handleClose = () => {
        reset();
        close();
    }

    const onSubmit = (data: SectionDetailsFormValues) => {
        createSection.mutate(
            {
                studyPlanId: studyPlanId,
                newSectionDetails: data
            },
            {onSuccess: handleClose}
        );
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={handleClose}
                title="Create Section"
                centered
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex gap="md" direction="column">
                        <LoadingOverlay
                            visible={createSection.isPending}
                            zIndex={1000}
                            overlayProps={{radius: "sm", blur: 2}}
                        />
                        <SectionDetailsFormFields control={control} errors={errors} getValues={getValues}/>
                        <Button type="submit" fullWidth mt="md">
                            Create Section
                        </Button>
                    </Flex>
                </form>
            </Modal>

            <ActionIcon variant="subtle" onClick={open}>
                <Plus />
            </ActionIcon>
        </>
    );
}
