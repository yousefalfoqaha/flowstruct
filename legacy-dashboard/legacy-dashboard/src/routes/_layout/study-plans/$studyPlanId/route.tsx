import {createFileRoute, Outlet} from '@tanstack/react-router'
import {getStudyPlanQuery} from "@/features/study-plan/queries.ts";
import {getStudyPlanDisplayName} from "@/lib/getStudyPlanDisplayName.ts";

export const Route = createFileRoute('/_layout/study-plans/$studyPlanId')({
    loader: async ({context: {queryClient}, params: {studyPlanId}}) => {
        const studyPlan = await queryClient.ensureQueryData(getStudyPlanQuery(Number(studyPlanId)));
        return {
            crumb: getStudyPlanDisplayName(studyPlan)
        };
    },
    component: () => <Outlet/>,
});
