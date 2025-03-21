import {createFileRoute, Outlet} from '@tanstack/react-router'
import {getStudyPlanQuery} from '@/features/study-plan/queries.ts'
import {getProgramQuery} from '@/features/program/queries.ts'
import {getCourseListQuery} from '@/features/course/queries.ts'
import {AppShell, Burger, Title} from '@mantine/core'
import {StudyPlanSidebar} from '@/features/study-plan/components/StudyPlanSidebar.tsx'
import {useDisclosure} from '@mantine/hooks'

export const Route = createFileRoute('/study-plans/$studyPlanId')({
    component: RouteComponent,
    loader: async ({context: {queryClient}, params}) => {
        const studyPlanId = parseInt(params.studyPlanId)

        const studyPlan = await queryClient.ensureQueryData(
            getStudyPlanQuery(studyPlanId),
        )
        await queryClient.ensureQueryData(getProgramQuery(studyPlan.program))

        const coursesIds = studyPlan.sections.flatMap((section) => section.courses)
        await queryClient.ensureQueryData(getCourseListQuery(coursesIds));
    },
});

function RouteComponent() {
    const [opened, {toggle}] = useDisclosure()
    const {studyPlanId} = Route.useParams()

    return (
        <AppShell
            header={{height: 60}}
            navbar={{
                width: '334',
                breakpoint: 'lg',
                collapsed: {mobile: !opened},
            }}
            padding="xl"
        >
            <AppShell.Header p="xs" pl="md">
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm"/>
                <Title fw={600} order={2}>GJUPlan Dashboard</Title>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <StudyPlanSidebar studyPlanId={Number(studyPlanId)}/>
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet/>
            </AppShell.Main>
        </AppShell>
    )
}
