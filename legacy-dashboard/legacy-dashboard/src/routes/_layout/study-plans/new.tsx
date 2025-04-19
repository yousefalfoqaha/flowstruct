import {createFileRoute} from '@tanstack/react-router'
import {CreateStudyPlanFieldset} from "@/features/study-plan/components/CreateStudyPlanFieldset.tsx";
import {getProgramListQuery} from "@/features/program/queries.ts";
import {CreatePageLayout} from "@/shared/components/CreatePageLayout.tsx";

export const Route = createFileRoute('/_layout/study-plans/new')({
    component: RouteComponent,
    loader: async ({context: {queryClient}}) => {
        await queryClient.ensureQueryData(getProgramListQuery);

        return {
          crumb: 'Create New Study Plan'
        };
    }
})

function RouteComponent() {
    return (
        <CreatePageLayout title="Create new Study Plan" backLink="/study-plans">
            <CreateStudyPlanFieldset/>
        </CreatePageLayout>
    );
}
