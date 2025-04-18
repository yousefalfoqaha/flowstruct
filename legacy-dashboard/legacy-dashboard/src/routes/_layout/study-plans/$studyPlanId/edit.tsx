import {createFileRoute, Link} from '@tanstack/react-router'
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {getProgramListQuery} from "@/features/program/queries.ts";
import {ActionIcon, Group, Stack, Title} from "@mantine/core";
import {ArrowLeft} from "lucide-react";
import {getVisibilityBadge} from "@/lib/getVisibilityBadge.tsx";
import {getStudyPlanDisplayName} from "@/lib/getStudyPlanDisplayName.ts";
import {EditStudyPlanDetailsFieldset} from "@/features/study-plan/components/EditStudyPlanDetailsFieldset.tsx";

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
        <Stack>
            <Group>
                <Link
                    to="/study-plans/$studyPlanId"
                    params={{studyPlanId: String(studyPlan.id)}}
                >
                    <ActionIcon size={42} variant="default">
                        <ArrowLeft size={18}/>
                    </ActionIcon>
                </Link>

                <Title order={2} fw={600}>
                    {getStudyPlanDisplayName(studyPlan)}
                </Title>

                {getVisibilityBadge(studyPlan.isPrivate)}
            </Group>

            <EditStudyPlanDetailsFieldset studyPlan={studyPlan}/>
        </Stack>
    )
}
