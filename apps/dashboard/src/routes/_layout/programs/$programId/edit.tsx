import {createFileRoute} from '@tanstack/react-router'
import {getProgramDisplayName} from '@/utils/getProgramDisplayName.ts'
import {Group} from '@mantine/core'
import {useProgram} from '@/features/program/hooks/useProgram.ts'
import {EditProgramFieldset} from '@/features/program/components/EditProgramFieldset.tsx'
import {PageHeaderWithBack} from "@/shared/components/PageHeaderWithBack.tsx";
import {PageLayout} from "@/shared/components/PageLayout.tsx";

export const Route = createFileRoute('/_layout/programs/$programId/edit')({
    component: RouteComponent,
    loader: () => ({
        crumb: 'Edit Details',
    }),
});

function RouteComponent() {
    const {data: program} = useProgram()

    return (
        <PageLayout
            header={
                <Group>
                    <PageHeaderWithBack
                        title={getProgramDisplayName(program)}
                        linkProps={{
                            to: '/programs/$programId',
                            params: {programId: String(program.id)}
                        }}
                    />
                </Group>
            }
        >
            <EditProgramFieldset program={program}/>
        </PageLayout>
    )
}
