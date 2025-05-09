import {createFileRoute, Outlet} from '@tanstack/react-router'
import {StudyPlanCourseListQuery, StudyPlanQuery} from "@/features/study-plan/queries.ts";
import {getStudyPlanDisplayName} from "@/utils/getStudyPlanDisplayName.ts";
import {ProgramQuery} from "@/features/program/queries.ts";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useProgram} from "@/features/program/hooks/useProgram.ts";
import {Button, Group, Stack, Text, Title} from "@mantine/core";
import {PageHeaderWithBack} from "@/shared/components/PageHeaderWithBack.tsx";
import {getProgramDisplayName} from "@/utils/getProgramDisplayName.ts";
import {visibilityBadge} from "@/shared/components/VisibilityBadge.tsx";
import {PageLayout} from "@/shared/components/PageLayout.tsx";
import {StudyPlanTabs} from "@/features/study-plan/components/StudyPlanTabs.tsx";
import {Upload} from "lucide-react";

export const Route = createFileRoute('/_layout/study-plans/$studyPlanId')({
    loader: async ({context: {queryClient}, params}) => {
        const studyPlanId = Number(params.studyPlanId);

        const studyPlan = await queryClient.ensureQueryData(StudyPlanQuery(studyPlanId));
        await queryClient.ensureQueryData(StudyPlanCourseListQuery(studyPlanId));
        const program = await queryClient.ensureQueryData(ProgramQuery(studyPlan.program));

        return {
            crumb: `${getProgramDisplayName(program)} - ${getStudyPlanDisplayName(studyPlan)}`
        };
    },
    component: RouteComponent,
});

function RouteComponent() {
    const {data: studyPlan} = useStudyPlan();
    const {data: program} = useProgram(studyPlan.program);

    const title = (
        <Stack gap={5}>
            <Title order={2} fw={600}>{getProgramDisplayName(program)}</Title>
            <Text c="dimmed" size="sm">{"Study Plan " + getStudyPlanDisplayName(studyPlan)}</Text>
        </Stack>
    )

    const header = (
        <Group justify="space-between">
            <PageHeaderWithBack
                title={title}
                linkProps={{to: '/study-plans'}}
            />

            {visibilityBadge(studyPlan.isPrivate)}

            <Button
                leftSection={<Upload size={18}/>}
                radius="xl"
                variant="default"
                mb="auto"
                ml="auto"
            >
                Publish Study Plan
            </Button>
        </Group>
    );

    return (
        <PageLayout header={header}>
            <StudyPlanTabs/>
            <Outlet/>
        </PageLayout>
    );
}
