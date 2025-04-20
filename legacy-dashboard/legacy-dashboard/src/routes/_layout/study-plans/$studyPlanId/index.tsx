import {createFileRoute} from '@tanstack/react-router'
import {Group} from "@mantine/core";
import {getVisibilityBadge} from "@/lib/getVisibilityBadge.tsx";
import {AppCard} from "@/shared/components/AppCard.tsx";
import {InfoItem} from "@/shared/components/InfoItem.tsx";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useProgram} from "@/features/program/hooks/useProgram.ts";
import {getStudyPlanDisplayName} from "@/lib/getStudyPlanDisplayName.ts";
import {getProgramDisplayName} from "@/lib/getProgramDisplayName.ts";
import {PageHeaderWithBack} from "@/shared/components/PageHeaderWithBack.tsx";
import {EditDetailsButton} from "@/shared/components/EditDetailsButton.tsx";
import {getDefaultSearchValues} from "@/lib/getDefaultSearchValues.ts";
import {PageLayout} from "@/shared/components/PageLayout.tsx";

export const Route = createFileRoute('/_layout/study-plans/$studyPlanId/')({
    component: RouteComponent,
});

function RouteComponent() {
    const {data: studyPlan} = useStudyPlan();
    const {data: program} = useProgram(studyPlan.program);

    return (
        <PageLayout
            header={
                <Group>
                    <PageHeaderWithBack
                        title={getStudyPlanDisplayName(studyPlan)}
                        linkProps={{
                            to: '/study-plans',
                            search: getDefaultSearchValues
                        }}
                    />
                    {getVisibilityBadge(studyPlan.isPrivate)}
                </Group>
            }
        >
            <AppCard
                title="Study Plan Information"
                subtitle="Details about this study plan"
                headerAction={
                    <EditDetailsButton
                        to="/study-plans/$studyPlanId/edit"
                        params={{studyPlanId: String(studyPlan.id)}}
                    />
                }
            >
                <InfoItem
                    label="Program"
                    value={getProgramDisplayName(program)}
                />

                <Group grow>
                    <InfoItem
                        label="Year"
                        value={`${studyPlan.year} - ${studyPlan.year + 1}`}
                    />
                    <InfoItem
                        label="Duration"
                        value={`${studyPlan.duration} Years`}
                    />
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
            </AppCard>
        </PageLayout>
    );
}
