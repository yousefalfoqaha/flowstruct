import {createFileRoute} from "@tanstack/react-router";
import {ProgramMapTab} from "@/features/study-plan/components/ProgramMapTab.tsx";
import {SectionsTab} from "@/features/study-plan/components/SectionsTab.tsx";
import {getProgramQuery} from "@/features/program/queries.ts";
import {getStudyPlanQuery} from "@/features/study-plan/queries.ts";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useProgram} from "@/features/program/hooks/useProgram.ts";
import {getCourseListQuery} from "@/features/course/queries.ts";
import {Folder, Map, ScrollText} from "lucide-react";
import {Tabs} from "@mantine/core";
import {CoursesGraphProvider} from "@/contexts/CoursesGraphContext.tsx";

export const Route = createFileRoute("/study-plans/$studyPlanId")({
    component: RouteComponent,
    loader: async ({context: {queryClient}, params}) => {
        const studyPlanId = parseInt(params.studyPlanId);

        const studyPlan = await queryClient.ensureQueryData(getStudyPlanQuery(studyPlanId));
        await queryClient.ensureQueryData(getProgramQuery(studyPlan.program));

        const coursesIds = studyPlan.sections.flatMap(s => Object.keys(s.courses).map(Number));
        await queryClient.ensureQueryData(getCourseListQuery(coursesIds));
    },
});

function RouteComponent() {
    const studyPlanId = parseInt(Route.useParams().studyPlanId);
    const {data: studyPlan} = useStudyPlan(studyPlanId);
    const {data: program} = useProgram(studyPlan.program);

    return (
        <Tabs defaultValue="overview">
            <Tabs.List justify="center">
                <Tabs.Tab value="overview" leftSection={<ScrollText size={14}/>}>
                    Overview
                </Tabs.Tab>
                <Tabs.Tab value="framework" leftSection={<Folder size={14}/>}>
                    Framework
                </Tabs.Tab>
                <Tabs.Tab value="program-map" leftSection={<Map size={14}/>}>
                    Program Map
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="overview">
                Overview placeholder
            </Tabs.Panel>

            <CoursesGraphProvider>
                <Tabs.Panel value="framework">
                    <SectionsTab sections={studyPlan.sections}/>
                </Tabs.Panel>

                <Tabs.Panel value="program-map">
                    <ProgramMapTab duration={studyPlan.duration} coursePlacements={studyPlan.coursePlacements}/>
                </Tabs.Panel>
            </CoursesGraphProvider>
        </Tabs>
    );
}
