import {Button, Card, Group, Text} from "@mantine/core";
import {ProgramDetailsFormFields} from "@/features/program/components/ProgramDetailsFormFields.tsx";
import {useForm} from "react-hook-form";
import {ProgramDetailsFormValues, programDetailsSchema} from "@/features/program/form-schemas.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link, useNavigate} from "@tanstack/react-router";
import {Pencil, Trash} from "lucide-react";
import {useEditProgramDetails} from "@/features/program/hooks/useEditProgramDetails.ts";
import {Program} from "@/features/program/types.ts";

type EditProgramFieldsetProps = {
    program: Program;
}

export function EditProgramFieldset({program}: EditProgramFieldsetProps) {
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<ProgramDetailsFormValues>({
        resolver: zodResolver(programDetailsSchema),
        defaultValues: {...program},
    });

    const editProgramDetails = useEditProgramDetails();
    const navigate = useNavigate();

    const onSubmit = (data: ProgramDetailsFormValues) => {
        editProgramDetails.mutate({
            programId: program.id,
            editedProgramDetails: data
        }, {
            onSuccess: () => {
                navigate({to: "/dashboard/programs"})
            }
        });
    };

    return (
        <Card padding="lg" withBorder shadow="sm">
            <Text size="xl" fw={600}>Program Information</Text>
            <Text size="xs" c="dimmed">Update the details for this program</Text>

            <Card.Section py="lg" inheritPadding>
                <form onSubmit={handleSubmit(onSubmit)} style={{width: '100%'}}>
                    <ProgramDetailsFormFields control={control} errors={errors}/>

                    <Group justify="space-between" mt="xl">
                        <Link to="/dashboard/programs">
                            <Button variant="filled" color="red" leftSection={<Trash size={18}/>}>Delete Program</Button>
                        </Link>

                        <Button
                            type="submit"
                            leftSection={<Pencil size={18}/>}
                            loading={editProgramDetails.isPending}
                        >
                            Update Details
                        </Button>
                    </Group>
                </form>
            </Card.Section>
        </Card>
    );
}
