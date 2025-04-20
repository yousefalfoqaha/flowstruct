import {createFileRoute} from '@tanstack/react-router'
import {useProgram} from "@/features/program/hooks/useProgram.ts";
import {Group} from "@mantine/core";
import {getProgramDisplayName} from "@/lib/getProgramDisplayName.ts";
import {getVisibilityBadge} from "@/lib/getVisibilityBadge.tsx";
import {AppCard} from "@/shared/components/AppCard.tsx";
import {InfoItem} from "@/shared/components/InfoItem.tsx";
import {Degree} from "@/features/program/types.ts";
import {getDefaultSearchValues} from "@/lib/getDefaultSearchValues.ts";
import {PageLayout} from "@/shared/components/PageLayout.tsx";
import {PageHeaderWithBack} from "@/shared/components/PageHeaderWithBack.tsx";
import {EditDetailsButton} from "@/shared/components/EditDetailsButton.tsx";

export const Route = createFileRoute('/_layout/programs/$programId/')({
    component: RouteComponent,
});

function RouteComponent() {
    const {data: program} = useProgram();

    return (
        <PageLayout
            header={
                <Group>
                    <PageHeaderWithBack
                        title={getProgramDisplayName(program)}
                        linkProps={{
                            to: '/programs',
                            search: getDefaultSearchValues()
                        }}
                    />
                    {getVisibilityBadge(program.isPrivate)}
                </Group>
            }
        >
            <AppCard
                title="Program Information"
                subtitle="Details about this program"
                headerAction={
                    <EditDetailsButton
                        to="/programs/$programId/edit"
                        params={{programId: String(program.id)}}
                    />
                }
            >
                <Group grow>
                    <InfoItem
                        label="Code"
                        value={program.code}
                    />
                    <InfoItem
                        label="Name"
                        value={program.name}
                    />
                </Group>

                <Group grow>
                    <InfoItem
                        label="Degree"
                        value={`${Degree[program.degree as keyof typeof Degree]} (${program.degree})`}
                    />
                    <InfoItem
                        label="Visibility"
                        value={program.isPrivate ? 'Hidden' : 'Public'}
                    />
                </Group>
            </AppCard>
        </PageLayout>
    );
}
