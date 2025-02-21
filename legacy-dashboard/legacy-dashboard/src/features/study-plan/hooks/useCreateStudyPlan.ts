import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@/shared/hooks/useToast.ts";
import {StudyPlanListItem} from "@/features/study-plan/types.ts";
import {createStudyPlanRequest} from "@/features/study-plan/api.ts";

export const useCreateStudyPlan = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createStudyPlanRequest,
        onSuccess: (newStudyPlan: StudyPlanListItem) => {
            queryClient.setQueryData(
                ['study-plans', 'list', newStudyPlan.program],
                (studyPlans: StudyPlanListItem[]) => {
                    return [...studyPlans, newStudyPlan];
                });

            toast({description: "Study plan created successfully."});
        },
        onError: (error) => {
            toast({
                description: error.message,
                variant: 'destructive'
            });
        }
    });
};