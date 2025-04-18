import {createFileRoute, Outlet} from '@tanstack/react-router'
import {getStudyPlanQuery} from "@/features/study-plan/queries.ts";
import {getStudyPlanDisplayName} from "@/lib/getStudyPlanDisplayName.ts";
import {getProgramQuery} from "@/features/program/queries.ts";

export const Route = createFileRoute('/_layout/study-plans/$studyPlanId')({
    loader: async ({context: {queryClient}, params}) => {
        const studyPlanId = Number(params.studyPlanId);

        const studyPlan = await queryClient.ensureQueryData(
            getStudyPlanQuery(studyPlanId)
        );

        await queryClient.ensureQueryData(getProgramQuery(studyPlan.program));

        return {
            crumb: getStudyPlanDisplayName(studyPlan)
        };
    },
    component: () => <Outlet/>,
});
