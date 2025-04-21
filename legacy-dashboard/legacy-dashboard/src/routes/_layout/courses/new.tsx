import {createFileRoute} from '@tanstack/react-router'
import {CreateCourseFieldset} from "@/features/course/components/CreateCourseFieldset.tsx";
import {PageHeaderWithBack} from "@/shared/components/PageHeaderWithBack.tsx";
import {getDefaultSearchValues} from "@/utils/getDefaultSearchValues.ts";
import {PageLayout} from "@/shared/components/PageLayout.tsx";

export const Route = createFileRoute('/_layout/courses/new')({
    component: RouteComponent,
    loader: () => ({crumb: 'Create New Course'})
});

function RouteComponent() {
    return (
        <PageLayout
            header={
                <PageHeaderWithBack
                    title="Create New Course"
                    linkProps={{
                        to: '/courses',
                        search: getDefaultSearchValues
                    }}
                />
            }
        >
            <CreateCourseFieldset/>
        </PageLayout>
    );
}
