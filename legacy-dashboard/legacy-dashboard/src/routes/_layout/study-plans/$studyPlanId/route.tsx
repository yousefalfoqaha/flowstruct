import {createFileRoute, Outlet} from '@tanstack/react-router'
import {StudyPlanCourseListQuery, StudyPlanQuery} from "@/features/study-plan/queries.ts";
import {getStudyPlanDisplayName} from "@/utils/getStudyPlanDisplayName.ts";
import {ProgramQuery} from "@/features/program/queries.ts";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useProgram} from "@/features/program/hooks/useProgram.ts";
import {Button, Divider, Group, Stack, Text, Title} from "@mantine/core";
import {PageHeaderWithBack} from "@/shared/components/PageHeaderWithBack.tsx";
import {getProgramDisplayName} from "@/utils/getProgramDisplayName.ts";
import {publishStatusBadge} from "@/shared/components/PublishStatusBadge.tsx";
import {PageLayout} from "@/shared/components/PageLayout.tsx";
import {StudyPlanTabs} from "@/features/study-plan/components/StudyPlanTabs.tsx";
import {Globe} from "lucide-react";
import {CoursesGraphProvider} from '@/contexts/CoursesGraphContext';

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
            <Group gap="lg">
                <PageHeaderWithBack
                    title={title}
                    linkProps={{to: '/study-plans'}}
                />
                {publishStatusBadge(studyPlan.isPublished)}
            </Group>

            <Button
                leftSection={<Globe size={18}/>}
                radius="xl"
                variant="outline"
                mb="auto"
                ml="auto"
                disabled={studyPlan.isPublished}
            >
                {studyPlan.isPublished ? 'Published' : 'Publish Study Plan'}
            </Button>
        </Group>
    );

    return (
        <PageLayout header={header}>
            <StudyPlanTabs/>
            <Divider my={0}/>
            <CoursesGraphProvider>
                <Outlet/>
            </CoursesGraphProvider>
        </PageLayout>
    );
}
