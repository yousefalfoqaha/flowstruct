import {createFileRoute, Outlet} from '@tanstack/react-router'
import {getStudyPlanQuery} from '@/features/study-plan/queries.ts'
import {getProgramQuery} from '@/features/program/queries.ts'
import {getCourseListQuery} from '@/features/course/queries.ts'
import {ActionIcon, AppShell, Avatar, Badge, Burger, Button, Flex, Group, Stack} from '@mantine/core'
import {StudyPlanSidebar} from '@/features/study-plan/components/StudyPlanSidebar.tsx'
import {useDisclosure} from '@mantine/hooks'
import {StudyPlanHeader} from "@/features/study-plan/components/StudyPlanHeader.tsx";
import {StudyPlanBreadcrumbs} from "@/features/study-plan/components/StudyPlanBreadcrumbs.tsx";
import {Eye, EyeOff, LogOut, Upload} from "lucide-react";
import {useToggleStudyPlanVisibility} from "@/features/study-plan/hooks/useToggleStudyPlanVisibility.ts";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";

export const Route = createFileRoute('/study-plans/$studyPlanId')({
    component: RouteComponent,
    loader: async ({context: {queryClient}, params}) => {
        const studyPlanId = parseInt(params.studyPlanId ?? '');

        const studyPlan = await queryClient.ensureQueryData(
            getStudyPlanQuery(studyPlanId),
        )
        await queryClient.ensureQueryData(getProgramQuery(studyPlan.program))

        const coursesIds = studyPlan.sections.flatMap((section) => section.courses)
        await queryClient.ensureQueryData(getCourseListQuery(coursesIds));
    },
});

function RouteComponent() {
    const [opened, {toggle}] = useDisclosure();
    const studyPlanId = parseInt(Route.useParams().studyPlanId ?? '');
    const {data: studyPlan} = useStudyPlan(studyPlanId);

    const toggleVisibility = useToggleStudyPlanVisibility();

    return (
        <AppShell
            navbar={{
                width: '250',
                breakpoint: 'xl',
                collapsed: {mobile: !opened},
            }}
            padding="xl"
        >
            <AppShell.Navbar style={{maxWidth: 250}} p="lg">
                <StudyPlanSidebar
                    closeSidebar={toggle}
                    studyPlanId={Number(studyPlanId)}
                />
            </AppShell.Navbar>

            <AppShell.Main>
                <Stack gap="md">
                    <Group justify="space-between">
                        <Group gap="xl">
                            <Burger
                                opened={opened}
                                onClick={toggle}
                                hiddenFrom="xl"
                                size="sm"
                            />

                            <StudyPlanBreadcrumbs/>
                        </Group>

                        <Group gap="lg">
                            <Button
                                radius="xl"
                                variant="default"
                                leftSection={studyPlan.isPrivate ? <Eye size={18} /> : <EyeOff size={18} />}
                                size="xs"
                                onClick={() => toggleVisibility.mutate(studyPlanId)}
                            >
                                Make {studyPlan.isPrivate ? 'Public' : 'Private'}
                            </Button>
                            <Button radius="xl" variant="default" leftSection={<Upload size={18} />} size="xs">Update Page</Button>


                            <Avatar
                                color="blue"
                                variant="transparent"
                                radius="xl"
                            />

                            <ActionIcon
                                size="sm"
                                variant="transparent"
                            >
                                <LogOut/>
                            </ActionIcon>
                        </Group>
                    </Group>

                    <Outlet/>
                </Stack>
            </AppShell.Main>
        </AppShell>
    )
}
