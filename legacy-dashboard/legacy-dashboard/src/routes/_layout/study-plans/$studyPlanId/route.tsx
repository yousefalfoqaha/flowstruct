import {createFileRoute, Outlet, useMatches, useNavigate} from '@tanstack/react-router'
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
import {Route as OverviewRoute} from './overview.tsx';
import {Route as FrameworkRoute} from './framework.tsx';
import {Route as ProgramMapRoute} from './program-map.tsx';


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

    const matches = useMatches();
    const navigate = useNavigate();

    const header = (
        <Group>
            <PageHeaderWithBack
                title={`${getProgramDisplayName(program)} - ${getStudyPlanDisplayName(studyPlan)}`}
                linkProps={{to: '..'}}
            />
            {getVisibilityBadge(studyPlan.isPrivate)}
        </Group>
    );

    const fullPath = matches.at(-1)?.fullPath ?? '';

    const tabs = [
        {label: 'Overview', path: OverviewRoute.to, icon: <ScrollText size={18}/>},
        {label: 'Framework', path: FrameworkRoute.to, icon: <Folder size={18}/>},
        {label: 'Program Map', path: ProgramMapRoute.to, icon: <Map size={18}/>},
        {label: 'Details', path: DetailsRoute.to, icon: <ReceiptText size={18}/>, rightAlign: true}
    ];

    const activeTab = tabs.find(tab =>
        fullPath.includes(tab.path))?.path ?? 'overview';

    return (
        <PageLayout header={header}>
            <Tabs
                value={activeTab}
                onChange={val => navigate({
                    to: val ?? '',
                    params: {studyPlanId: String(studyPlan.id)}
                })}
                variant="default"
            >
                <Tabs.List>
                    {tabs.map(tab => (
                        <Tabs.Tab
                            key={tab.path}
                            value={tab.path}
                            leftSection={tab.icon}
                            ml={tab.rightAlign ? 'auto' : 0}
                        >
                            {tab.label}
                        </Tabs.Tab>
                    ))}
                </Tabs.List>
            </Tabs>

            <Outlet/>
        </PageLayout>
    );
}
