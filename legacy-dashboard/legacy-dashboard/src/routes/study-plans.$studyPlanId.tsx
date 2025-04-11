import {createFileRoute, Outlet} from '@tanstack/react-router'
import {getStudyPlanQuery} from '@/features/study-plan/queries.ts'
import {getProgramQuery} from '@/features/program/queries.ts'
import {getCourseListQuery} from '@/features/course/queries.ts'
import {AppShell, Stack} from '@mantine/core'
import {StudyPlanSidebar} from '@/features/study-plan/components/StudyPlanSidebar.tsx'
import {useDisclosure} from '@mantine/hooks';
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {StudyPlanHeader} from "@/features/study-plan/components/StudyPlanHeader.tsx";

export const Route = createFileRoute('/study-plans/$studyPlanId')({
    component: RouteComponent,
    loader: async ({context: {queryClient}, params: {studyPlanId}}) => {
        const studyPlan = await queryClient.ensureQueryData(getStudyPlanQuery(Number(studyPlanId)));

        await queryClient.ensureQueryData(getProgramQuery(studyPlan.program));

        const coursesIds = studyPlan.sections.flatMap((section) => section.courses)
        await queryClient.ensureQueryData(getCourseListQuery(coursesIds));
    },
});

function RouteComponent() {
    const [sidebarOpened, {toggle}] = useDisclosure();
    const {data: studyPlan} = useStudyPlan();

    const MOBILE_BREAKPOINT = 'xl';

    return (
        <AppShell
            navbar={{
                width: '250',
                breakpoint: MOBILE_BREAKPOINT,
                collapsed: {mobile: !sidebarOpened}
            }}
            padding="xl"
        >
            <AppShell.Navbar p="lg">
                <StudyPlanSidebar closeSidebar={toggle} studyPlan={studyPlan}/>
            </AppShell.Navbar>

            <AppShell.Main>
                <Stack gap="md">
                    <StudyPlanHeader mobileBreakpoint={MOBILE_BREAKPOINT} studyPlan={studyPlan} toggleSidebar={toggle}/>

                    <Outlet/>
                </Stack>
            </AppShell.Main>
        </AppShell>
    );
}
