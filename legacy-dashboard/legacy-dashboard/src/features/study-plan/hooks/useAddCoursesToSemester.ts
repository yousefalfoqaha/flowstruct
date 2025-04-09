import {useQueryClient} from "@tanstack/react-query";
import {addCoursesToSemester} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useAddCoursesToSemester = () => {
    const queryClient = useQueryClient();
    return useAppMutation(addCoursesToSemester, {
        onSuccess: (updatedStudyPlan) => queryClient.setQueryData(studyPlanKeys.detail(updatedStudyPlan.id), updatedStudyPlan)
    });
}
