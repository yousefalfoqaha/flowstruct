import {createFileRoute} from '@tanstack/react-router'
import {FrameworkCoursesTable} from "@/features/study-plan/components/FrameworkCoursesTable.tsx";
import {CoursesGraphProvider} from "@/contexts/CoursesGraphContext.tsx";

export const Route = createFileRoute('/study-plans/$studyPlanId/framework')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <CoursesGraphProvider>
            <FrameworkCoursesTable/>
        </CoursesGraphProvider>
    );
}
