import {Plus} from "lucide-react";
import {useCreateSection} from "@/features/study-plan/hooks/useCreateSection.ts";
import {useParams} from "@tanstack/react-router";
import {useForm} from "react-hook-form";
import {SectionDetailsFormValues, sectionDetailsSchema} from "@/features/study-plan/form-schemas.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useDisclosure} from "@mantine/hooks";
import {Flex, LoadingOverlay, Modal, Button} from "@mantine/core";
import {SectionDetailsFormFields} from "@/features/study-plan/components/SectionDetailsFormFields.tsx";

export function CreateSectionModal({ closeDropdown }: { closeDropdown: () => void }) {
    const [opened, {open, close}] = useDisclosure(false);

    const {handleSubmit, control, reset, getValues, formState: {errors}} = useForm<SectionDetailsFormValues>({
        resolver: zodResolver(sectionDetailsSchema),
    });

    const createSection = useCreateSection();

    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? '');

    const onSubmit = (data: SectionDetailsFormValues) => {
        createSection.mutate({
            studyPlanId: studyPlanId,
            newSectionDetails: data
        }, {
            onSuccess: () => {
                reset();
                close();
            }
        });
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => {
                    reset();
                    close();
                }}
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
                        <Button type="submit" fullWidth mt="md">Create Section</Button>
                    </Flex>
                </form>
            </Modal>

            <Button
                fullWidth
                variant="subtle"
                onClick={() => {
                    closeDropdown();
                    open();
                }}
                leftSection={<Plus size={14}/>}
            >
                Create Section
            </Button>
        </>
    );
}
