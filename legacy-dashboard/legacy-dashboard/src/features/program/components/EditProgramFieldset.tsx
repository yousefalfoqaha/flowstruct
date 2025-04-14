import {Button, Group} from "@mantine/core";
import {ProgramDetailsFormFields} from "@/features/program/components/ProgramDetailsFormFields.tsx";
import {programDetailsSchema} from "@/features/program/form-schemas.ts";
import {Link, useNavigate} from "@tanstack/react-router";
import {Pencil, Trash} from "lucide-react";
import {useEditProgramDetails} from "@/features/program/hooks/useEditProgramDetails.ts";
import {Program} from "@/features/program/types.ts";
import {AppCard} from "@/shared/components/AppCard.tsx";
import {useAppForm} from "@/shared/hooks/useAppForm.ts";

type EditProgramFieldsetProps = {
    program: Program;
}

export function EditProgramFieldset({program}: EditProgramFieldsetProps) {
    const form = useAppForm(programDetailsSchema, {...program});
    const editProgramDetails = useEditProgramDetails();
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

    return (
        <AppCard
            title="Program Information"
            subtitle="Update the details for this program"
            footer={
                <>
                    <Group justify="space-between" mt="xl">
                        <Link to="/programs">
                            <Button variant="filled" color="red" leftSection={<Trash size={18}/>}>
                                Delete Program
                            </Button>
                        </Link>

                        <Button
                            type="submit"
                            leftSection={<Pencil size={18}/>}
                            loading={editProgramDetails.isPending}
                        >
                            Update Details
                        </Button>
                    </Group>
                </>
            }
        >
            <form onSubmit={onSubmit} style={{width: '100%'}}>
                <ProgramDetailsFormFields form={form}/>
            </form>
        </AppCard>
    );
}
