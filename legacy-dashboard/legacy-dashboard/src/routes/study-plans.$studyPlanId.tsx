import {createFileRoute} from "@tanstack/react-router";
import {ProgramMapTab} from "@/features/study-plan/components/ProgramMapTab.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/shared/components/ui/tabs.tsx";
import {SectionsTab} from "@/features/study-plan/components/SectionsTab.tsx";
import {getProgramQuery} from "@/features/program/queries.ts";
import {getStudyPlanQuery} from "@/features/study-plan/queries.ts";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useProgram} from "@/features/program/hooks/useProgram.ts";
import {getCourseListQuery} from "@/features/course/queries.ts";

export const Route = createFileRoute("/study-plans/$studyPlanId")({
    component: RouteComponent,
    loader: async ({context: {queryClient}, params}) => {
        const studyPlanId = parseInt(params.studyPlanId);

        const studyPlan = await queryClient.ensureQueryData(getStudyPlanQuery(studyPlanId));
        await queryClient.ensureQueryData(getProgramQuery(studyPlan.program));

        const studyPlanCourseIds = studyPlan.sections.flatMap(section => Array.from(section.courses));
        const cachedCourses = queryClient.getQueryData(["courses"]);

        const missingCourseIds = studyPlanCourseIds.reduce<number[]>((acc, courseId) => {
            if (!cachedCourses || !cachedCourses[courseId]) {
                acc.push(courseId);
            }
            return acc;
        }, []);

        await queryClient.ensureQueryData(getCourseListQuery(missingCourseIds));
    },
});

function RouteComponent() {
    const studyPlanId = parseInt(Route.useParams().studyPlanId);
    const {data: studyPlan} = useStudyPlan(studyPlanId);
    const {data: program} = useProgram(studyPlan.program);

    return (
        <div className="space-y-2 p-8">
            <header className="space-y-1">
                <h1 className="text-3xl font-bold">{program.degree} {program.name}</h1>
                <h3 className="opacity-60">
                    Study
                    Plan {studyPlan.year}/{studyPlan.year + 1} {studyPlan.track ? "- " + studyPlan.track : ""}
                </h3>
            </header>

            <div>
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
            </div>
        </div>
    );
}
