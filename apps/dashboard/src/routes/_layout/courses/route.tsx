import {createFileRoute, Outlet} from '@tanstack/react-router'
import {PaginatedCourseListQuery} from "@/features/course/queries.ts";
import {getDefaultSearchValues} from "@/utils/getDefaultSearchValues.ts";

export const Route = createFileRoute('/_layout/courses')({
    loader: async ({context: {queryClient}}) => {
        await queryClient.ensureQueryData(PaginatedCourseListQuery(getDefaultSearchValues()))

        return {
            crumb: 'Courses'
        };
    },
    component: () => <Outlet/>,
});
