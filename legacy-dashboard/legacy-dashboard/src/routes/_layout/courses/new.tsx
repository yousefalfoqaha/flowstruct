import {createFileRoute} from '@tanstack/react-router'
import {CreateCourseFieldset} from "@/features/course/components/CreateCourseFieldset.tsx";
import {CreatePageLayout} from "@/shared/components/CreatePageLayout.tsx";

export const Route = createFileRoute('/_layout/courses/new')({
    component: RouteComponent,
    loader: () => ({crumb: 'Create New Course'})
});

function RouteComponent() {
    return (
        <CreatePageLayout title="Create new Course" backLink="/courses">
            <CreateCourseFieldset/>
        </CreatePageLayout>
    );
}
