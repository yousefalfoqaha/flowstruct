import {useQueryClient} from "@tanstack/react-query";
import {createSection} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useCreateSection = () => {
    const queryClient = useQueryClient();
    return useAppMutation(createSection, {
        onSuccess: (updatedStudyPlan) => queryClient.setQueryData(studyPlanKeys.detail(updatedStudyPlan.id), updatedStudyPlan),
        successNotification: {message: "Section created successfully."}
    });
};
