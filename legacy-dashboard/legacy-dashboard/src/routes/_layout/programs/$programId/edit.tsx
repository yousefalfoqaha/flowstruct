import {createFileRoute, Link} from '@tanstack/react-router'
import {getProgramDisplayName} from '@/lib/getProgramDisplayName.ts'
import {ActionIcon, Group, Stack, Title} from '@mantine/core'
import {ArrowLeft} from 'lucide-react'
import {useProgram} from '@/features/program/hooks/useProgram.ts'
import {EditProgramFieldset} from '@/features/program/components/EditProgramFieldset.tsx'
import {getVisibilityBadge} from '@/lib/getVisibilityBadge.tsx'

export const Route = createFileRoute('/_layout/programs/$programId/edit')({
    component: RouteComponent,
    loader: () => ({
        crumb: 'Edit Details',
    }),
});

function RouteComponent() {
    const {data: program} = useProgram()

    return (
        <Stack>
            <Group>
                <Link
                    to="/programs/$programId"
                    params={{programId: String(program.id)}}
                >
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
