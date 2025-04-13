import {createFileRoute, Link} from '@tanstack/react-router'
import {getProgramQuery} from '@/features/program/queries.ts'
import {getProgramDisplayName} from '@/lib/getProgramName.ts'
import {ActionIcon, Group, Stack, Title} from '@mantine/core'
import {ArrowLeft} from 'lucide-react'
import {useProgram} from '@/features/program/hooks/useProgram.ts'
import {EditProgramFieldset} from '@/features/program/components/EditProgramFieldset.tsx'
import {getVisibilityBadge} from "@/lib/getVisibilityBadge.tsx";

export const Route = createFileRoute('/dashboard/programs/$programId/edit')({
    component: RouteComponent,
    loader: async ({context: {queryClient}, params}) => {
        const programId = parseInt(params.programId)

        await queryClient.ensureQueryData(getProgramQuery(programId));

        return {
            crumb: 'Edit',
        }
    },
});

function RouteComponent() {
    const {data: program} = useProgram();

    return (
        <Stack>
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

            <EditProgramFieldset program={program}/>
        </Stack>
    )
}
