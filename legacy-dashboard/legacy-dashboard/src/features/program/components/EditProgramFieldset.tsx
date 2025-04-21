import {Button, Text} from "@mantine/core";
import {ProgramDetailsFormFields} from "@/features/program/components/ProgramDetailsFormFields.tsx";
import {programDetailsSchema} from "@/features/program/schemas.ts";
import {useNavigate} from "@tanstack/react-router";
import {Pencil, Trash} from "lucide-react";
import {useEditProgramDetails} from "@/features/program/hooks/useEditProgramDetails.ts";
import {Program} from "@/features/program/types.ts";
import {AppCard} from "@/shared/components/AppCard.tsx";
import {useAppForm} from "@/shared/hooks/useAppForm.ts";
import {modals} from "@mantine/modals";
import {useDeleteProgram} from "@/features/program/hooks/useDeleteProgram.ts";
import {getDefaultSearchValues} from "@/utils/getDefaultSearchValues.ts";

type EditProgramFieldsetProps = {
    program: Program;
}

export function EditProgramFieldset({program}: EditProgramFieldsetProps) {
    const form = useAppForm(programDetailsSchema, {...program});
    const editProgramDetails = useEditProgramDetails();
    const deleteProgram = useDeleteProgram();
    const navigate = useNavigate();

    const onSubmit = form.handleSubmit(data => {
        editProgramDetails.mutate({
            programId: program.id,
            editedProgramDetails: data
        }, {
            onSuccess: () => {
                navigate({to: "/programs/$programId", params: {programId: String(program.id)}});
            }
        });
    });

    const handleDelete = () => deleteProgram.mutate(program.id, {
            onSuccess: () => navigate({
                to: '/programs',
                search: getDefaultSearchValues()
            })
        }
    );

    return (
        <AppCard
            title="Program Information"
            subtitle="Update the details for this program"
            footer={
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
                                        Deleting this program will delete all of its study plans. Are
                                        you absolutely sure?
                                    </Text>
                                ),
                                labels: {confirm: 'Confirm', cancel: 'Cancel'},
                                onConfirm: handleDelete,
                            })
                        }
                        loading={deleteProgram.isPending}
                    >
                        Delete Program
                    </Button>

                    <Button
                        type="submit"
                        leftSection={<Pencil size={18}/>}
                        loading={editProgramDetails.isPending}
                    >
                        Update Details
                    </Button>
                </>
            }
        >
            <form onSubmit={onSubmit}>
                <ProgramDetailsFormFields form={form}/>
            </form>
        </AppCard>
    );
}
