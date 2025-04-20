import {createFileRoute} from '@tanstack/react-router'
import {PageHeaderWithBack} from "@/shared/components/PageHeaderWithBack.tsx";
import {useCourse} from "@/features/course/hooks/useCourse.ts";
import {getCourseDisplayName} from "@/lib/getCourseDisplayName.ts";
import {AppCard} from "@/shared/components/AppCard.tsx";
import {PageLayout} from "@/shared/components/PageLayout.tsx";

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
            <AppCard
                title="Course Information"
                subtitle="Update the details for this course"
            >
                <></>
            </AppCard>
        </PageLayout>
    );
}
