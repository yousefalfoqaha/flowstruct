import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@/shared/hooks/useToast.ts";
import {StudyPlan} from "@/features/study-plan/types.ts";
import {createSectionRequest} from "@/features/study-plan/api.ts";

export const useCreateSection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createSectionRequest,
        onSuccess: ((updatedStudyPlan: StudyPlan) => {
            queryClient.setQueryData(["study-plan", "detail", updatedStudyPlan.id], updatedStudyPlan);

            toast({description: "Created section successfully."});
        }),
        onError: (error) => {
            toast({
                description: error.message,
                variant: 'destructive'
            });
        }
    });
}