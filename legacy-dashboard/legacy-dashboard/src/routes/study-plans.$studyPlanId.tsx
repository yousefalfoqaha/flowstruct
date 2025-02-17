import {createFileRoute} from "@tanstack/react-router";
import {getPrograms} from "@/queries/getPrograms.ts";
import {getStudyPlan} from "@/queries/getStudyPlan.ts";
import {useSuspenseQuery} from "@tanstack/react-query";
import {ProgramMapTab} from "@/components/ProgramMapTab.tsx";
import {useStudyPlan} from "@/hooks/useStudyPlan.ts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {getStudyPlanCourses} from "@/queries/getStudyPlanCourses.ts";
import {SectionsTab} from "@/components/SectionsTab.tsx";

export const Route = createFileRoute("/study-plans/$studyPlanId")({
    component: RouteComponent,
    loader: async ({context: {queryClient}, params}) => {
        await queryClient.ensureQueryData(getPrograms());

        const studyPlan = await queryClient.ensureQueryData(getStudyPlan(parseInt(params.studyPlanId)));

        await queryClient.ensureQueryData(
            getStudyPlanCourses(
                Number(params.studyPlanId),
                studyPlan.sections.flatMap(section => Array.from(section.courses))
            )
        );
    },
});

function RouteComponent() {
    const {studyPlan} = useStudyPlan();
    const {data: programs} = useSuspenseQuery(getPrograms());

    const program = programs.find((p) => p.id === studyPlan.data.program);
    if (!program) return;

    return (
        <div className="space-y-2 p-8">
            <header className="space-y-1">
                <h1 className="text-3xl font-bold">{program.degree} {program.name}</h1>
                <h3 className="opacity-60">
                    Study
                    Plan {studyPlan.data.year}/{studyPlan.data.year + 1} {studyPlan.data.track ? "- " + studyPlan.data.track : ""}
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
                            <ProgramMapTab/>
                        </TabsContent>
                        <TabsContent value="password">
                            <SectionsTab/>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
