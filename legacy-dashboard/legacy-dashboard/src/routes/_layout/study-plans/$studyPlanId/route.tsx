import {createFileRoute, Outlet} from '@tanstack/react-router'
import {StudyPlanCourseListQuery, StudyPlanQuery} from "@/features/study-plan/queries.ts";
import {getStudyPlanDisplayName} from "@/utils/getStudyPlanDisplayName.ts";
import {ProgramQuery} from "@/features/program/queries.ts";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useProgram} from "@/features/program/hooks/useProgram.ts";
import {Group} from "@mantine/core";
import {PageHeaderWithBack} from "@/shared/components/PageHeaderWithBack.tsx";
import {getProgramDisplayName} from "@/utils/getProgramDisplayName.ts";
import {visibilityBadge} from "@/shared/components/VisibilityBadge.tsx";
import {PageLayout} from "@/shared/components/PageLayout.tsx";
import {StudyPlanTabs} from "@/features/study-plan/components/StudyPlanTabs.tsx";

export const Route = createFileRoute('/_layout/study-plans/$studyPlanId')({
    loader: async ({context: {queryClient}, params}) => {
        const studyPlanId = Number(params.studyPlanId);

        const studyPlan = await queryClient.ensureQueryData(StudyPlanQuery(studyPlanId));
        await queryClient.ensureQueryData(StudyPlanCourseListQuery(studyPlanId));
        await queryClient.ensureQueryData(ProgramQuery(studyPlan.program));

        return {
            crumb: getStudyPlanDisplayName(studyPlan)
        };
    },
    component: RouteComponent,
});

function RouteComponent() {
    const {data: studyPlan} = useStudyPlan();
    const {data: program} = useProgram(studyPlan.program);

    const header = (
        <Group>
            <PageHeaderWithBack
                title={`${getProgramDisplayName(program)} - ${getStudyPlanDisplayName(studyPlan)}`}
                linkProps={{to: '/study-plans'}}
            />
            {visibilityBadge(studyPlan.isPrivate)}
        </Group>
    );

    return (
        <PageLayout header={header}>
            <StudyPlanTabs/>
            <Outlet/>
        </PageLayout>
    );
}
