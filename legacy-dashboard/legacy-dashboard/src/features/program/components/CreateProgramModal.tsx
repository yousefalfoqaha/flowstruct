import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Modal, Flex, LoadingOverlay} from "@mantine/core";
import {Plus} from "lucide-react";
import {useDisclosure} from "@mantine/hooks";
import {ProgramDetailsFormValues, programDetailsSchema} from "@/features/program/form-schemas.ts";
import {ProgramDetailsFormFields} from "@/features/program/components/ProgramDetailsFormFields.tsx";
import {useCreateProgram} from "@/features/program/hooks/useCreateProgram.ts";

export function CreateProgramModal() {
    const [opened, {open, close}] = useDisclosure(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<ProgramDetailsFormValues>({
        resolver: zodResolver(programDetailsSchema),
    });

    const createProgram = useCreateProgram();

    const onSubmit = (data: ProgramDetailsFormValues) => {
        createProgram.mutate(data, {
            onSuccess: () => {
                close();
                reset();
            }
        });
    };

    return (
        <>
            <Modal opened={opened} onClose={() => {
                close();
                reset();
            }} title="Create Program" centered>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex gap="md" direction="column">
                        <LoadingOverlay visible={createProgram.isPending} zIndex={1000}
                                        overlayProps={{radius: "sm", blur: 2}}/>

                        <ProgramDetailsFormFields control={control} errors={errors}/>

                        <Button type="submit" fullWidth mt="md">Create Program</Button>
                    </Flex>
                </form>
            </Modal>

            <Button onClick={open} leftSection={<Plus size={14}/>}>
                Create Program
            </Button>
        </>
    );
}
