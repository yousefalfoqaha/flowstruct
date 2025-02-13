import {createFileRoute} from "@tanstack/react-router";
import {getPrograms} from "@/queries/getPrograms.ts";
import {getStudyPlan} from "@/queries/getStudyPlan.ts";
import {useSuspenseQuery} from "@tanstack/react-query";
import {CoursesGrid} from "@/components/CoursesGrid.tsx";
import {StudyPlanProvider} from "@/providers/StudyPlanProvider.tsx";
import {useStudyPlan} from "@/hooks/useStudyPlan.ts";

export const Route = createFileRoute("/study-plans/$studyPlanId")({
    component: RouteComponent,
    loader: async ({context: {queryClient}, params}) => {
        await queryClient.ensureQueryData(getPrograms());
        await queryClient.ensureQueryData(getStudyPlan(parseInt(params.studyPlanId)));
    },
});

function RouteComponent() {
    const studyPlanId = parseInt(Route.useParams().studyPlanId);
    const {data: studyPlan} = useStudyPlan(studyPlanId);
    const {data: programs} = useSuspenseQuery(getPrograms());

    const program = programs.find(p => p.id === studyPlan.program);
    if (!program) return;

    return (
        <StudyPlanProvider studyPlanId={studyPlanId}>
            <div className="flex justify-center p-8">
                <div className="space-y-4">
                    <header className="space-y-1">
                        <h1 className="text-3xl font-bold">{program.degree} {program.name}</h1>
                        <h3 className="opacity-60">Study
                            Plan {studyPlan.year}/{studyPlan.year + 1} {studyPlan.track ? "- " + studyPlan.track : ""}</h3>
                    </header>

                    <CoursesGrid/>
                </div>
            </div>
        </StudyPlanProvider>
    );

}
