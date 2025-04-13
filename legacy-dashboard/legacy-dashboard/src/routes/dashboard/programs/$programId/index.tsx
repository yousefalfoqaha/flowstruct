import {createFileRoute, Link} from '@tanstack/react-router'
import {getProgramQuery} from "@/features/program/queries.ts";
import {getProgramDisplayName} from "@/lib/getProgramName.ts";
import {useProgram} from "@/features/program/hooks/useProgram.ts";
import {ActionIcon, Button, Card, Flex, Group, Stack, Text, Title} from "@mantine/core";
import {ArrowLeft, Pencil} from "lucide-react";
import {Degree} from '@/features/program/types';
import {getVisibilityBadge} from "@/lib/getVisibilityBadge.tsx";

export const Route = createFileRoute('/dashboard/programs/$programId/')({
    component: RouteComponent,
    loader: async ({context: {queryClient}, params}) => {
        const programId = parseInt(params.programId)

        const program = await queryClient.ensureQueryData(
            getProgramQuery(programId),
        )

        return {
            crumb: getProgramDisplayName(program),
        }
    },
});

function RouteComponent() {
    const {data: program} = useProgram();

    return (
        <Stack>
            <Group justify="space-between">
                <Group>
                    <Link to="/dashboard/programs">
                        <ActionIcon size={42} variant="default">
                            <ArrowLeft size={18}/>
                        </ActionIcon>
                    </Link>
                    <Title order={2} fw={600}>
                        {getProgramDisplayName(program)}
                    </Title>
                    {getVisibilityBadge(program.isPrivate)}
                </Group>
            </Group>

            <Card padding="lg" withBorder shadow="sm">
                <Flex justify="space-between">
                    <div>
                        <Text size="xl" fw={600}>Program Information</Text>
                        <Text size="xs" c="dimmed">Details about this program</Text>
                    </div>
                    <Link to="/dashboard/programs/$programId/edit" params={{programId: String(program.id)}}>
                        <Button leftSection={<Pencil size={18}/>} variant="outline">
                            Edit Details
                        </Button>
                    </Link>
                </Flex>
                <Card.Section inheritPadding py="lg">
                    <Stack>
                        <Group grow>
                            <Stack gap={2}>
                                <Text c="dimmed" size="sm" fw={600}>Code</Text>
                                <Text>{program.code}</Text>
                            </Stack>
                            <Stack gap={2}>
                                <Text c="dimmed" size="sm" fw={600}>Name</Text>
                                <Text>{program.name}</Text>
                            </Stack>
                        </Group>

                        <Group grow>
                            <Stack gap={2}>
                                <Text c="dimmed" size="sm" fw={600}>Degree</Text>
                                <Text>{Degree[program.degree as keyof typeof Degree]} ({program.degree})</Text>
                            </Stack>
                            <Stack gap={2}>
                                <Text c="dimmed" size="sm" fw={600}>Visibility</Text>
                                <Text>{program.isPrivate ? 'Hidden' : 'Public'}</Text>
                            </Stack>
                        </Group>
                    </Stack>
                </Card.Section>
            </Card>
        </Stack>
    );
}