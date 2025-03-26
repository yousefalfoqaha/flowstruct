import {createFileRoute} from '@tanstack/react-router'
import {FrameworkCoursesTable} from "@/features/study-plan/components/FrameworkCoursesTable.tsx";
import {CoursesGraphProvider} from "@/contexts/CoursesGraphContext.tsx";
import {Flex} from "@mantine/core";
import {StudyPlanHeader} from "@/features/study-plan/components/StudyPlanHeader.tsx";

export const Route = createFileRoute('/study-plans/$studyPlanId/framework')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Flex direction="column" gap="xl">
            <StudyPlanHeader title={'Framework'}/>

            <CoursesGraphProvider>
                <FrameworkCoursesTable/>
            </CoursesGraphProvider>
        </Flex>
    );
}
