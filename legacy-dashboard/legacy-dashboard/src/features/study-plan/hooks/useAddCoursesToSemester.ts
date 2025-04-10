import {useQueryClient} from "@tanstack/react-query";
import {placeCourses} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const usePlaceCourses = () => {
    const queryClient = useQueryClient();
    return useAppMutation(placeCourses, {
        onSuccess: (updatedStudyPlan) => queryClient.setQueryData(studyPlanKeys.detail(updatedStudyPlan.id), updatedStudyPlan)
    });
}
