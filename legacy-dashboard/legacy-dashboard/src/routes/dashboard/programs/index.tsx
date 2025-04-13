import {createFileRoute, Link} from '@tanstack/react-router'
import {getProgramListQuery} from '@/features/program/queries.ts'
import {ProgramsTable} from '@/features/program/components/ProgramsTable.tsx'
import {Button, Group, Stack, Title} from '@mantine/core'
import {Plus} from "lucide-react";

export const Route = createFileRoute('/dashboard/programs/')({
    loader: async ({context: {queryClient}}) => {
        await queryClient.ensureQueryData(getProgramListQuery)

        return {
            crumb: 'Programs',
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Stack>
            <Group justify="space-between">
                <Title order={2} fw={600}>Programs</Title>

                <Link to={"/dashboard/programs/new"}>
                    <Button leftSection={<Plus size={18}/>}>Create Program</Button>
                </Link>
            </Group>

            <ProgramsTable/>
        </Stack>
    );
}
