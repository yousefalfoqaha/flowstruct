import {createFileRoute} from '@tanstack/react-router'
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {getProgramListQuery} from "@/features/program/queries.ts";
import {Group} from "@mantine/core";
import {getVisibilityBadge} from "@/lib/getVisibilityBadge.tsx";
import {getStudyPlanDisplayName} from "@/lib/getStudyPlanDisplayName.ts";
import {EditStudyPlanDetailsFieldset} from "@/features/study-plan/components/EditStudyPlanDetailsFieldset.tsx";
import {PageLayout} from "@/shared/components/PageLayout.tsx";
import {PageHeaderWithBack} from "@/shared/components/PageHeaderWithBack.tsx";

export const Route = createFileRoute('/_layout/study-plans/$studyPlanId/edit')({
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

    return (
        <PageLayout
            header={
                <Group>
                    <PageHeaderWithBack
                        title={getStudyPlanDisplayName(studyPlan)}
                        linkProps={{to: '/study-plans'}}
                    />
                    {getVisibilityBadge(studyPlan.isPrivate)}
                </Group>
            }
        >
            <EditStudyPlanDetailsFieldset studyPlan={studyPlan}/>
        </PageLayout>
    );
}
