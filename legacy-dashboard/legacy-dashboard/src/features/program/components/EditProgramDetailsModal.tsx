import {Button, Flex} from "@mantine/core";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ProgramDetailsFormValues, programDetailsSchema} from "@/features/program/form-schemas.ts";
import {ProgramListItem} from "@/features/program/types.ts";
import {modals} from "@mantine/modals";
import {ProgramDetailsFormFields} from "@/features/program/components/ProgramDetailsFormFields.tsx";
import {useEditProgramDetails} from "@/features/program/hooks/useEditProgramDetails.ts";

export function EditProgramDetailsModal({program}: { program: ProgramListItem }) {
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<ProgramDetailsFormValues>({
        resolver: zodResolver(programDetailsSchema),
        defaultValues: {...program},
    });

    const editProgramDetails = useEditProgramDetails();

    const onSubmit = (data: ProgramDetailsFormValues) => {
        editProgramDetails.mutate({
            programId: program.id,
            editedProgramDetails: data
        }, {onSuccess: () => modals.closeAll()});
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="md">
                <ProgramDetailsFormFields control={control} errors={errors}/>
                <Button type="submit" fullWidth mt="md">
                    Save Changes
                </Button>
            </Flex>
        </form>
    );
}
