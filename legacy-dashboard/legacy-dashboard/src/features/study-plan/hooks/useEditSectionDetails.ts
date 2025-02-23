import {useMutation, useQueryClient} from "@tanstack/react-query";
import {StudyPlan} from "@/features/study-plan/types.ts";
import {toast} from "@/shared/hooks/useToast.ts";
import {editSectionDetailsRequest} from "@/features/study-plan/api.ts";

export const useEditSectionDetails = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editSectionDetailsRequest,
        onSuccess: ((updatedStudyPlan: StudyPlan) => {
            queryClient.setQueryData(["study-plan", "detail", updatedStudyPlan.id], updatedStudyPlan);
            toast({description: "Successfully edited section details."});
        }),
        onError: (error) => toast({description: error.message, variant: 'destructive'})
    });
}