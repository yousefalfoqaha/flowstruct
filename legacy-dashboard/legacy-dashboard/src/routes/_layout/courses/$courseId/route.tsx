import {createFileRoute, Outlet} from '@tanstack/react-router'
import {getCourseQuery} from "@/features/course/queries.ts";
import {getCourseDisplayName} from "@/utils/getCourseDisplayName.ts";

export const Route = createFileRoute('/_layout/courses/$courseId')({
    component: () => <Outlet/>,
    loader: async ({context: {queryClient}, params}) => {
        const courseId = Number(params.courseId);
        const course = await queryClient.ensureQueryData(getCourseQuery(courseId));

        return {
            crumb: getCourseDisplayName(course)
        };
    }
});