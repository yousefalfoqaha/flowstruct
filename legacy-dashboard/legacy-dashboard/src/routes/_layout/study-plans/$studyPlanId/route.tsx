import {createFileRoute, Outlet, useMatch, useMatches, useNavigate} from '@tanstack/react-router'
import {getStudyPlanQuery} from "@/features/study-plan/queries.ts";
import {getStudyPlanDisplayName} from "@/utils/getStudyPlanDisplayName.ts";
import {getProgramQuery} from "@/features/program/queries.ts";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useProgram} from "@/features/program/hooks/useProgram.ts";
import {Group, Tabs} from "@mantine/core";
import {PageHeaderWithBack} from "@/shared/components/PageHeaderWithBack.tsx";
import {getProgramDisplayName} from "@/utils/getProgramDisplayName.ts";
import {getVisibilityBadge} from "@/utils/getVisibilityBadge.tsx";
import {PageLayout} from "@/shared/components/PageLayout.tsx";
import {Folder, Map, ReceiptText, ScrollText} from "lucide-react";
import {Route as DetailsRoute} from './details/index.tsx';

export const Route = createFileRoute('/_layout/study-plans/$studyPlanId')({
    loader: async ({context: {queryClient}, params}) => {
        const studyPlanId = Number(params.studyPlanId);

        const studyPlan = await queryClient.ensureQueryData(
            getStudyPlanQuery(studyPlanId)
        );

        await queryClient.ensureQueryData(getProgramQuery(studyPlan.program));

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
                linkProps={{
                    to: '..'
                }}
            />
            {getVisibilityBadge(studyPlan.isPrivate)}
        </Group>
    );

    const matches = useMatches();
    const navigate = useNavigate();

    return (
        <PageLayout header={header}>

            <Tabs
                value={matches.at(-1)?.fullPath}
                onChange={val => navigate({
                    to: val ?? '',
                    params: {studyPlanId: String(studyPlan.id)}
                })}
                variant="default"
            >
                <Tabs.List>
                    <Tabs.Tab value="overview" leftSection={<ScrollText size={18}/>}>
                        Overview
                    </Tabs.Tab>

                    <Tabs.Tab value="framework" leftSection={<Folder size={18}/>}>
                        Framework
                    </Tabs.Tab>

                    <Tabs.Tab value="program-map" leftSection={<Map size={18}/>}>
                        Program Map
                    </Tabs.Tab>

                    <Tabs.Tab value={DetailsRoute.to} leftSection={<ReceiptText size={18}/>} ml="auto">
                        Details
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs>

            <Outlet/>

        </PageLayout>
    );
}
