import {createFileRoute} from '@tanstack/react-router'
import {FrameworkCoursesTable} from "@/features/study-plan/components/FrameworkCoursesTable.tsx";
import {CoursesGraphProvider} from "@/contexts/CoursesGraphContext.tsx";
import {Flex, Group, Title} from "@mantine/core";
import {StudyPlanBreadcrumbs} from "@/features/study-plan/components/StudyPlanBreadcrumbs.tsx";

export const Route = createFileRoute('/study-plans/$studyPlanId/framework')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Flex direction="column" gap="xl">
            <Flex direction="column" gap="lg">
                <StudyPlanBreadcrumbs/>

                <Group justify="space-between">
                    <Title fw={600} order={2}>Framework - 3.1.1 Program Requirements (Core Courses)</Title>
                </Group>
            </Flex>
            <CoursesGraphProvider>
                <FrameworkCoursesTable/>
            </CoursesGraphProvider>
        </Flex>
    );
}
