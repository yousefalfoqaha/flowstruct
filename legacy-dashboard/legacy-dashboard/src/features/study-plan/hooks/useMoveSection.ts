import {useQueryClient} from "@tanstack/react-query";
import {moveSection} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useMoveSection = () => {
    const queryClient = useQueryClient();
    return useAppMutation(moveSection, {
        onSuccess: (updatedStudyPlan) => queryClient.setQueryData(studyPlanKeys.detail(updatedStudyPlan.id), updatedStudyPlan)
    });
}
