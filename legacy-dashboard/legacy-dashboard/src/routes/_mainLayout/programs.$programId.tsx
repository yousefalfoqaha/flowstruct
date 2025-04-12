import {createFileRoute} from '@tanstack/react-router'
import {StudyPlansTable} from '@/features/study-plan/components/StudyPlansTable.tsx'
import {CreateStudyPlanModal} from '@/features/study-plan/components/CreateStudyPlanModal.tsx'
import {getProgramQuery} from '@/features/program/queries.ts'
import {getStudyPlanListQuery} from '@/features/study-plan/queries.ts'
import {useStudyPlanList} from '@/features/study-plan/hooks/useStudyPlanList.ts'
import {Loader2} from 'lucide-react'
import {getProgramDisplayName} from "@/lib/getProgramName.ts";

export const Route = createFileRoute('/_mainLayout/programs/$programId')({
    component: RouteComponent,
    loader: async ({context: {queryClient}, params}) => {
        const programId = parseInt(params.programId)

        const program = await queryClient.ensureQueryData(getProgramQuery(programId))
        await queryClient.ensureQueryData(getStudyPlanListQuery(programId))

        return {
            crumb: getProgramDisplayName(program)
        };
    },
});

function RouteComponent() {
    const programId = parseInt(Route.useParams().programId)
    const studyPlanList = useStudyPlanList(programId)

    if (!studyPlanList.data) return

    return (
        <>
            <CreateStudyPlanModal programId={programId}/>

            {studyPlanList.isPending ? (
                <div className="p-10">
                    <Loader2 className="animate-spin text-gray-500 mx-auto"/>
                </div>
            ) : (
                <StudyPlansTable studyPlanList={studyPlanList.data}/>
            )}
        </>
    )
}
