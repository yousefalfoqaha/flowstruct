import {createFileRoute} from '@tanstack/react-router'
import {StudyPlansTable} from '@/features/study-plan/components/StudyPlansTable.tsx'
import {CreateStudyPlanModal} from '@/features/study-plan/components/CreateStudyPlanModal.tsx'
import {DeleteStudyPlanDialog} from '@/features/study-plan/components/DeleteStudyPlanDialog.tsx'
import {getProgramQuery} from "@/features/program/queries.ts";
import {getStudyPlanListQuery} from "@/features/study-plan/queries.ts";
import {useProgram} from "@/features/program/hooks/useProgram.ts";
import {useStudyPlanList} from "@/features/study-plan/hooks/useStudyPlanList.ts";
import {Loader2} from "lucide-react";

export const Route = createFileRoute('/programs/$programId/study-plans')({
    component: RouteComponent,
    loader: async ({context: {queryClient}, params}) => {
        const programId = parseInt(params.programId);

        await queryClient.ensureQueryData(getProgramQuery(programId));
        await queryClient.ensureQueryData(getStudyPlanListQuery(programId));
    },
});

function RouteComponent() {
    const programId = parseInt(Route.useParams().programId);
    const program = useProgram(programId);
    const studyPlanList = useStudyPlanList(programId);

    return (
        <div className="space-y-6 p-8">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-4xl font-semibold">
                    {program.data.degree} {program.data.name} Study Plans
                </h1>
                <CreateStudyPlanModal programId={programId}/>
            </div>

                {studyPlanList.isPending
                    ? <div className="p-10"><Loader2 className="animate-spin text-gray-500 mx-auto"/></div>
                    : <StudyPlansTable studyPlanList={studyPlanList.data}/>
                }
        </div>
    );
}
