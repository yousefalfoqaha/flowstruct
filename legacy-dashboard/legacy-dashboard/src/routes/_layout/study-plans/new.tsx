import {createFileRoute} from '@tanstack/react-router'
import {CreateStudyPlanFieldset} from "@/features/study-plan/components/CreateStudyPlanFieldset.tsx";
import {ProgramListQuery} from "@/features/program/queries.ts";
import {PageHeaderWithBack} from "@/shared/components/PageHeaderWithBack.tsx";
import {PageLayout} from "@/shared/components/PageLayout.tsx";

export const Route = createFileRoute('/_layout/study-plans/new')({
    component: RouteComponent,
    loader: async ({context: {queryClient}}) => {
        await queryClient.ensureQueryData(ProgramListQuery);

        return {
            crumb: 'Create New Study Plan'
        };
    }
})

function RouteComponent() {
    return (
        <PageLayout header={<PageHeaderWithBack title="Create New Course" linkProps={{to: '..'}}/>}>
            <CreateStudyPlanFieldset/>
        </PageLayout>
    );
}
