import {createFileRoute, useParams} from '@tanstack/react-router'
import {getPrograms} from "@/queries/getPrograms.ts";
import {getStudyPlan} from "@/queries/getStudyPlan.ts";

export const Route = createFileRoute('/study-plans/$studyPlanId')({
    component: RouteComponent,
    loader: async ({context: {queryClient}, params}) => {
        await queryClient.ensureQueryData(getPrograms());
        await queryClient.ensureQueryData(getStudyPlan(parseInt(params.studyPlanId)));
    }
});

function RouteComponent() {
    const studyPlanId = parseInt(Route.useParams().studyPlanId)

    return <div>Hello study plan {studyPlanId}!</div>
}
