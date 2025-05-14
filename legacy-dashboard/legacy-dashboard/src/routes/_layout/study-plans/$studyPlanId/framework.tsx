import {createFileRoute, stripSearchParams} from '@tanstack/react-router'
import {CoursesGraphProvider} from "@/contexts/CoursesGraphContext.tsx";
import {FrameworkCoursesTable} from "@/features/study-plan/components/FrameworkCoursesTable.tsx";
import {FrameworkCoursesTableSearchSchema} from "@/shared/schemas.ts";
import {getDefaultFrameworkCoursesSearchValues} from "@/utils/getDefaultFrameworkCoursesSearchValues.ts";

export const Route = createFileRoute(
    '/_layout/study-plans/$studyPlanId/framework',
)({
    component: RouteComponent,
    loader: () => ({crumb: 'Framework'}),
    validateSearch: FrameworkCoursesTableSearchSchema,
    search: {
        middlewares: [
            stripSearchParams(getDefaultFrameworkCoursesSearchValues())
        ]
    }
});

function RouteComponent() {
    return (
        <CoursesGraphProvider>
            <FrameworkCoursesTable/>
        </CoursesGraphProvider>
    );
}
