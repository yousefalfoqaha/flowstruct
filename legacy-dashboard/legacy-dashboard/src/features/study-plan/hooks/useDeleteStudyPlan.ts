import {useQueryClient} from "@tanstack/react-query";
import {deleteStudyPlan} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useDeleteStudyPlan = () => {
    const queryClient = useQueryClient();

    return useAppMutation(deleteStudyPlan, {
        onSuccess: (_, studyPlanId) => {
            queryClient.invalidateQueries({queryKey: studyPlanKeys.list()});
            queryClient.removeQueries({queryKey: studyPlanKeys.detail(studyPlanId)});
        },
        successNotification: {message: "Deleted study plan."}
    });
}
