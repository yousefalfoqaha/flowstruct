import {createFileRoute} from '@tanstack/react-router';
import {getProgramStudyPlans} from "@/queries/getProgramStudyPlans.ts";
import {StudyPlansTable} from "@/components/StudyPlansTable.tsx";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getPrograms} from "@/queries/getPrograms.ts";
import {CreateStudyPlanDialog} from "@/components/CreateStudyPlanDialog.tsx";

export const Route = createFileRoute('/programs/$programId')({
    component: RouteComponent,
    loader: async ({context: {queryClient}, params}) => {
        await queryClient.ensureQueryData(getPrograms());
        await queryClient.ensureQueryData(getProgramStudyPlans(parseInt(params.programId)));
    },
});

function RouteComponent() {
    const programId = parseInt(Route.useParams().programId);
    const {data: programs} = useSuspenseQuery(getPrograms());

    const program = programs.find(p => p.id === programId);
    if (!program) return;


    return (
        <div className="space-y-6 p-8">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-4xl font-semibold">{program.degree} {program.name} Study Plans</h1>
                <CreateStudyPlanDialog program={program}/>
            </div>

            <StudyPlansTable program={program}/>
        </div>
)
    ;
}
