import {createFileRoute} from "@tanstack/react-router";
import {ProgramMapTab} from "@/features/study-plan/components/ProgramMapTab.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shared/components/ui/tabs.tsx";
import {SectionsTab} from "@/features/study-plan/components/SectionsTab.tsx";
import {getProgramQuery} from "@/features/program/queries.ts";
import {getStudyPlanQuery} from "@/features/study-plan/queries.ts";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useProgram} from "@/features/program/hooks/useProgram.ts";
import {getCourseListQuery} from "@/features/course/queries.ts";
import {FlaggedCoursesProvider} from "@/contexts/FlaggedCoursesContext.tsx";

export const Route = createFileRoute("/study-plans/$studyPlanId")({
    component: RouteComponent,
    loader: async ({context: {queryClient}, params}) => {
        const studyPlanId = parseInt(params.studyPlanId);

        const studyPlan = await queryClient.ensureQueryData(getStudyPlanQuery(studyPlanId));
        await queryClient.ensureQueryData(getProgramQuery(studyPlan.program));

        const coursesIds = studyPlan.sections.flatMap(section => Array.from(section.courses));
        await queryClient.ensureQueryData(getCourseListQuery(coursesIds));
    },
});

function RouteComponent() {
    const studyPlanId = parseInt(Route.useParams().studyPlanId);
    const {data: studyPlan} = useStudyPlan(studyPlanId);
    const {data: program} = useProgram(studyPlan.program);

    return (
        <FlaggedCoursesProvider>
            <Tabs defaultValue="program-map" className="flex flex-col gap-1 items-center">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="password">Framework</TabsTrigger>
                    <TabsTrigger value="program-map">Program Map</TabsTrigger>
                </TabsList>
                <div className="place-self-start w-full">
                    <TabsContent value="program-map">
                        <ProgramMapTab duration={studyPlan.duration} coursePlacements={studyPlan.coursePlacements}/>
                    </TabsContent>
                    <TabsContent value="password">
                        <SectionsTab sections={studyPlan.sections}/>
                    </TabsContent>
                </div>
            </Tabs>
        </FlaggedCoursesProvider>
    );
}
