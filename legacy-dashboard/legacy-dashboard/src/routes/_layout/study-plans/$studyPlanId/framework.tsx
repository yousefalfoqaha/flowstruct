import {createFileRoute, stripSearchParams} from '@tanstack/react-router'
import {CoursesGraphProvider} from "@/contexts/CoursesGraphContext.tsx";
import {FrameworkCoursesTable} from "@/features/study-plan/components/FrameworkCoursesTable.tsx";
import {TableSearchSchema} from "@/shared/schemas.ts";
import {getDefaultSearchValues} from "@/utils/getDefaultSearchValues.ts";

export const Route = createFileRoute(
    '/_layout/study-plans/$studyPlanId/framework',
)({
    component: RouteComponent,
    validateSearch: TableSearchSchema,
    search: {
        middlewares: [
            stripSearchParams(getDefaultSearchValues())
        ]
    }
})

function RouteComponent() {
    return (
        <CoursesGraphProvider>
            <FrameworkCoursesTable/>
        </CoursesGraphProvider>
    );
}
