import {useQueryClient} from "@tanstack/react-query";
import {removeCoursePrerequisite} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useRemoveCoursePrerequisite = () => {
    const queryClient = useQueryClient();
    return useAppMutation(removeCoursePrerequisite, {
        onSuccess: (updatedStudyPlan) => queryClient.setQueryData(studyPlanKeys.detail(updatedStudyPlan.id), updatedStudyPlan)
    });
}
