import {createFileRoute} from '@tanstack/react-router'
import {FrameworkCoursesTable} from "@/features/study-plan/components/FrameworkCoursesTable.tsx";
import {CoursesGraphProvider} from "@/contexts/CoursesGraphContext.tsx";
import {Flex, Group, Title} from "@mantine/core";
import {StudyPlanBreadcrumbs} from "@/features/study-plan/components/StudyPlanBreadcrumbs.tsx";
import {CourseSearch} from "@/features/course/components/CourseSearch.tsx";
import React from "react";

export const Route = createFileRoute('/study-plans/$studyPlanId/framework')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Flex direction="column" gap="lg">
            <Flex direction="column" gap="md">
                <StudyPlanBreadcrumbs/>
                <Group justify="space-between">
                    <Title fw={600} order={2}>Framework</Title>
                    <CourseSearch/>
                </Group>
            </Flex>
            <CoursesGraphProvider>
                <FrameworkCoursesTable/>
            </CoursesGraphProvider>
        </Flex>
    );
}
