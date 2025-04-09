import {useQueryClient} from "@tanstack/react-query";
import {deleteSection} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useDeleteSection = () => {
    const queryClient = useQueryClient();
    return useAppMutation(deleteSection, {
        onSuccess: (updatedStudyPlan) => queryClient.setQueryData(studyPlanKeys.detail(updatedStudyPlan.id), updatedStudyPlan),
        successNotification: {message: "Section deleted successfully."}
    });
}