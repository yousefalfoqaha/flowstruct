import {createFileRoute} from '@tanstack/react-router'
import {PageHeaderWithBack} from "@/shared/components/PageHeaderWithBack.tsx";
import {useCourse} from "@/features/course/hooks/useCourse.ts";
import {getCourseDisplayName} from "@/utils/getCourseDisplayName.ts";
import {AppCard} from "@/shared/components/AppCard.tsx";
import {PageLayout} from "@/shared/components/PageLayout.tsx";
import {EditCourseFieldset} from "@/features/course/components/EditCourseFieldset.tsx";

export const Route = createFileRoute('/_layout/courses/$courseId/edit')({
    component: RouteComponent,
    loader: () => ({crumb: 'Edit Details'})
});

function RouteComponent() {
    const {data: course} = useCourse();

    return (
        <PageLayout
            header={
                <PageHeaderWithBack
                    title={getCourseDisplayName(course)}
                    linkProps={{
                        to: '/courses/$courseId',
                        params: {courseId: String(course.id)}
                    }}
                />
            }
        >
                <EditCourseFieldset course={course} />
        </PageLayout>
    );
}
