import {createFileRoute} from '@tanstack/react-router'
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {getProgramListQuery} from "@/features/program/queries.ts";
import {EditStudyPlanDetailsFieldset} from "@/features/study-plan/components/EditStudyPlanDetailsFieldset.tsx";

export const Route = createFileRoute('/_layout/study-plans/$studyPlanId/details/edit')({
    component: RouteComponent,
    loader: async ({context: {queryClient}}) => {
        await queryClient.ensureQueryData(getProgramListQuery);

        return {
            crumb: 'Edit Details'
        };
    }
});

function RouteComponent() {
    const {data: studyPlan} = useStudyPlan();
    return <EditStudyPlanDetailsFieldset studyPlan={studyPlan}/>;
}
