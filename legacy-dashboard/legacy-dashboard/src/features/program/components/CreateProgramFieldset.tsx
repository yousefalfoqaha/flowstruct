import {Button, Card, Group, Text} from "@mantine/core";
import {ProgramDetailsFormFields} from "@/features/program/components/ProgramDetailsFormFields.tsx";
import {useForm} from "react-hook-form";
import {ProgramDetailsFormValues, programDetailsSchema} from "@/features/program/form-schemas.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCreateProgram} from "@/features/program/hooks/useCreateProgram.ts";
import {Link, useNavigate} from "@tanstack/react-router";
import {Plus, X} from "lucide-react";

export function CreateProgramFieldset() {
    const {
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<ProgramDetailsFormValues>({
        resolver: zodResolver(programDetailsSchema),
        defaultValues: {
            isPrivate: true
        }
    });

    const createProgram = useCreateProgram();
    const navigate = useNavigate();

    const onSubmit = (data: ProgramDetailsFormValues) => {
        createProgram.mutate(data, {
            onSuccess: () => {
                reset();
                navigate({to: "/dashboard/programs"});
            }
        });
    };

    return (
        <Card padding="lg" withBorder shadow="sm">
            <Text size="xl" fw={600}>Program Details</Text>
            <Text size="xs" c="dimmed">Enter the details for the new program</Text>

            <Card.Section py="lg" inheritPadding>
                <form onSubmit={handleSubmit(onSubmit)} style={{width: '100%'}}>
                    <ProgramDetailsFormFields control={control} errors={errors}/>

                    <Group justify="space-between" mt="xl">
                        <Link to="/dashboard/programs">
                            <Button variant="default" leftSection={<X size={18}/>}>Cancel</Button>
                        </Link>

                        <Button
                            type="submit"
                            leftSection={<Plus size={18}/>}
                            loading={createProgram.isPending}
                        >
                            Save Program
                        </Button>
                    </Group>
                </form>
            </Card.Section>
        </Card>
    );
}
