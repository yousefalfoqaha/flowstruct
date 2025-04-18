import {createFileRoute, Outlet} from '@tanstack/react-router'
import {getStudyPlanListQuery} from "@/features/study-plan/queries.ts";
import {getProgramListQuery} from "@/features/program/queries.ts";

export const Route = createFileRoute('/_layout/study-plans')({
    loader: async ({context: {queryClient}}) => {
        await queryClient.ensureQueryData(getStudyPlanListQuery());
        await queryClient.ensureQueryData(getProgramListQuery);

        return {
            crumb: 'Study Plans',
        };
    },
    component: () => <Outlet/>,
});
