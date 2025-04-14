import {createFileRoute, Link} from '@tanstack/react-router'
import {getProgramQuery} from '@/features/program/queries.ts'
import {getProgramDisplayName} from '@/lib/getProgramDisplayName.ts'
import {useProgram} from '@/features/program/hooks/useProgram.ts'
import {ActionIcon, Button, Group, Stack, Title,} from '@mantine/core'
import {ArrowLeft, Pencil} from 'lucide-react'
import {Degree} from '@/features/program/types'
import {getVisibilityBadge} from '@/lib/getVisibilityBadge.tsx'
import {AppCard} from "@/shared/components/AppCard.tsx";
import {InfoItem} from "@/shared/components/InfoItem.tsx";

export const Route = createFileRoute('/_layout/programs/$programId')({
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
})

function RouteComponent() {
    const {data: program} = useProgram()

    return (
        <Stack>
            <Group justify="space-between">
                <Group>
                    <Link to="/programs">
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

            <AppCard
                title="Program Information"
                subtitle="Details about this program"
                headerAction={
                    <Link
                        to="/programs/$programId/edit"
                        params={{programId: String(program.id)}}
                    >
                        <Button leftSection={<Pencil size={18}/>} variant="outline">
                            Edit Details
                        </Button>
                    </Link>
                }
            >
                <Stack gap="lg">
                    <Group grow>
                        <InfoItem label="Code" value={program.code}/>
                        <InfoItem label="Name" value={program.name}/>
                    </Group>

                    <Group grow>
                        <InfoItem
                            label="Degree"
                            value={`${Degree[program.degree as keyof typeof Degree]} (${program.degree})`}
                        />
                        <InfoItem
                            label="Visibility"
                            value={program.isPrivate ? 'Hidden' : 'Public'}
                        />
                    </Group>
                </Stack>
            </AppCard>
        </Stack>
    );
}
