import {useQueryClient} from "@tanstack/react-query";
import {StudyPlanListItem} from "@/features/study-plan/types.ts";
import {deleteStudyPlan} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useDeleteStudyPlan = () => {
    const queryClient = useQueryClient();
    return useAppMutation(deleteStudyPlan, {
        onSuccess: (_, deletedStudyPlan) => {
            queryClient.setQueryData(
                studyPlanKeys.list(deletedStudyPlan.program as number),
                (previous: StudyPlanListItem[]) => {
                    return previous.filter((plan) => plan.id !== deletedStudyPlan.id);
                }
            );

            queryClient.removeQueries({queryKey: studyPlanKeys.detail(deletedStudyPlan.id as number)});
        },
        successNotification: {message: "Deleted study plan successfully."}
    });
}
