import {createFileRoute, Link} from '@tanstack/react-router'
import {CreateStudyPlanFieldset} from "@/features/study-plan/components/CreateStudyPlanFieldset.tsx";
import {ActionIcon, Group, Stack, Title} from "@mantine/core";
import {ArrowLeft} from "lucide-react";
import {getDefaultSearchValues} from "@/lib/getDefaultSearchValues.ts";
import {getProgramListQuery} from "@/features/program/queries.ts";

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
        <Stack>
            <Group>
                <Link search={getDefaultSearchValues()} to="/study-plans">
                    <ActionIcon size={42} variant="default">
                        <ArrowLeft size={18}/>
                    </ActionIcon>
                </Link>

                <Title order={2} fw={600}>
                    Create New Study Plan
                </Title>
            </Group>

            <CreateStudyPlanFieldset/>
        </Stack>
    );
}
