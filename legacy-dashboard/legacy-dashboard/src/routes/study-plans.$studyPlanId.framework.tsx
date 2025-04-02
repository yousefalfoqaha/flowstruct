import {createFileRoute} from '@tanstack/react-router'
import {FrameworkCoursesTable} from "@/features/study-plan/components/FrameworkCoursesTable.tsx";
import {CoursesGraphProvider} from "@/contexts/CoursesGraphContext.tsx";
import {Stack, Title} from "@mantine/core";

export const Route = createFileRoute('/study-plans/$studyPlanId/framework')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Stack gap="lg">
            <Title fw={600}>Framework</Title>
            <CoursesGraphProvider>
                <FrameworkCoursesTable/>
            </CoursesGraphProvider>
        </Stack>
    );
}
