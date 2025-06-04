import {createFileRoute} from '@tanstack/react-router'
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {ProgramListQuery} from "@/features/program/queries.ts";
import {EditStudyPlanDetailsFieldset} from "@/features/study-plan/components/EditStudyPlanDetailsFieldset.tsx";

export const Route = createFileRoute('/_layout/study-plans/$studyPlanId/details/edit')({
    component: RouteComponent,
    loader: async ({context: {queryClient}}) => {
        await queryClient.ensureQueryData(ProgramListQuery);

        return {
            crumb: 'Edit Details'
        };
    }
});

function RouteComponent() {
    const {data: studyPlan} = useStudyPlan();
    return <EditStudyPlanDetailsFieldset studyPlan={studyPlan}/>;
}
