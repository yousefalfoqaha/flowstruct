import {createFileRoute, Outlet} from '@tanstack/react-router'
import {Folder, Map, Pencil, ScrollText} from 'lucide-react'
import {AppLayout} from '@/shared/components/AppLayout.tsx'
import {Button, Text, Title} from '@mantine/core'
import {openModal} from '@mantine/modals'
import {EditStudyPlanDetailsModal} from '@/features/study-plan/components/EditStudyPlanDetailsModal.tsx'
import {getStudyPlanQuery} from '@/features/study-plan/queries.ts'
import {getProgramQuery} from '@/features/program/queries.ts'
import {useProgram} from '@/features/program/hooks/useStudyPlanProgram.ts'
import {useStudyPlan} from '@/features/study-plan/hooks/useStudyPlan.ts'
import {Route as OverviewRoute} from "@/routes/study-plans/$studyPlanId/_studyPlanLayout/index.tsx";
import {Route as FrameworkRoute} from "@/routes/study-plans/$studyPlanId/_studyPlanLayout/framework.tsx";
import {Route as ProgramMapRoute} from "@/routes/study-plans/$studyPlanId/_studyPlanLayout/program-map.tsx";
import {SidebarLink} from "@/shared/types.ts";
import {getStudyPlanDisplayName} from "@/utils/getStudyPlanDisplayName.ts";
import {getProgramDisplayName} from "@/utils/getProgramDisplayName.ts";

export const Route = createFileRoute(
    '/old-study-plans/_studyPlanLayout',
)({
    loader: async ({context: {queryClient}, params}) => {
        const studyPlanId = parseInt(params.studyPlanId)
        const studyPlan = await queryClient.ensureQueryData(
            getStudyPlanQuery(studyPlanId),
        );
        const program = await queryClient.ensureQueryData(getProgramQuery(studyPlan.program))

        return {
            crumb: `${getProgramDisplayName(program)} ${getStudyPlanDisplayName(studyPlan)}`
        };
    },
    component: RouteComponent,
});

const data: SidebarLink[] = [
    {label: 'Overview', icon: ScrollText, route: OverviewRoute.to},
    {label: 'Framework', icon: Folder, route: FrameworkRoute.to},
    {label: 'Program Map', icon: Map, route: ProgramMapRoute.to},
];

function RouteComponent() {
    const {data: program} = useProgram()
    const {data: studyPlan} = useStudyPlan()

    const studyPlanDisplayName = getStudyPlanDisplayName(studyPlan);

    const sidebarHeader = () => (
        <>
            <Title order={3} fw={600} pb={8}>
                {program.degree} {program.name}
            </Title>

            <Text size="sm" c="dimmed">
                {studyPlanDisplayName}
            </Text>

            <Button
                fullWidth
                size="sm"
                mt="md"
                leftSection={<Pencil size={14}/>}
                variant="default"
                onClick={() =>
                    openModal({
                        title: `Edit Study Plan Details`,
                        centered: true,
                        children: <EditStudyPlanDetailsModal studyPlan={studyPlan}/>,
                    })
                }
            >
                Edit Details
            </Button>
        </>
    )

    return (
        <AppLayout sidebarHeader={sidebarHeader()} sidebarData={data}>
            <Outlet/>
        </AppLayout>
    )
}
