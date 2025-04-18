import {createFileRoute, Link} from '@tanstack/react-router'
import {ActionIcon, Button, Group, Stack, Title} from "@mantine/core";
import {ArrowLeft, Pencil} from "lucide-react";
import {getVisibilityBadge} from "@/lib/getVisibilityBadge.tsx";
import {AppCard} from "@/shared/components/AppCard.tsx";
import {InfoItem} from "@/shared/components/InfoItem.tsx";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useProgram} from "@/features/program/hooks/useProgram.ts";
import {getStudyPlanDisplayName} from "@/lib/getStudyPlanDisplayName.ts";
import {getDefaultSearchValues} from "@/lib/getDefaultSearchValues.ts";
import {getProgramDisplayName} from "@/lib/getProgramDisplayName.ts";

export const Route = createFileRoute('/_layout/study-plans/$studyPlanId/')({
    component: RouteComponent,
});

function RouteComponent() {
    const {data: studyPlan} = useStudyPlan();
    const {data: program} = useProgram(studyPlan.program);

    return (
        <Stack>
            <Group>
                <Link search={getDefaultSearchValues()} to="/study-plans">
                    <ActionIcon size={42} variant="default">
                        <ArrowLeft size={18}/>
                    </ActionIcon>
                </Link>
                <Title order={2} fw={600}>
                    {getStudyPlanDisplayName(studyPlan)}
                </Title>
                {getVisibilityBadge(studyPlan.isPrivate)}
            </Group>

            <AppCard
                title="Study Plan Information"
                subtitle="Details about this study plan"
                headerAction={
                    <Link
                        to="/study-plans/$studyPlanId/edit"
                        params={{studyPlanId: String(studyPlan.id)}}
                    >
                        <Button leftSection={<Pencil size={18}/>} variant="outline">
                            Edit Details
                        </Button>
                    </Link>
                }
            >
                <Stack gap="lg">
                    <InfoItem label="Program" value={getProgramDisplayName(program)}/>

                    <Group grow>
                        <InfoItem label="Year" value={`${studyPlan.year} - ${studyPlan.year + 1}`}/>
                        <InfoItem label="Duration" value={`${studyPlan.duration} Years`} />
                    </Group>

                    <Group grow>
                        <InfoItem
                            label="Track"
                            value={studyPlan.track ? studyPlan.track : '---'}
                        />
                        <InfoItem
                            label="Visibility"
                            value={studyPlan.isPrivate ? 'Hidden' : 'Public'}
                        />
                    </Group>
                </Stack>
            </AppCard>
        </Stack>
    );
}
