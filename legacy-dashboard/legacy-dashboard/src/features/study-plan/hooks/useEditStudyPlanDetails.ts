import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@/shared/hooks/useToast.ts";
import {StudyPlan, StudyPlanListItem} from "@/features/study-plan/types.ts";
import {updateStudyPlanDetailsRequest} from "@/features/study-plan/api.ts";

export const useEditStudyPlanDetails = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateStudyPlanDetailsRequest,
        onSuccess: (updatedStudyPlan: Partial<StudyPlan>) => {
            queryClient.setQueryData(
                ["study-plans", "list", updatedStudyPlan.program],
                (previous: StudyPlanListItem[]) => {
                    return previous.map(studyPlan =>
                        studyPlan.id === updatedStudyPlan.id ? updatedStudyPlan : studyPlan
                    );
                }
            );

            const detailedStudyPlan = queryClient.getQueryData(["study-plan", "detail", updatedStudyPlan.id]);
            if (!detailedStudyPlan) return;

            queryClient.setQueryData(["study-plan", "detail", updatedStudyPlan.id], {
                ...detailedStudyPlan,
                duration: updatedStudyPlan.duration,
                track: updatedStudyPlan.track,
                year: updatedStudyPlan.year,
            });

            toast({description: 'Study plan updated successfully'});
        },
        onError: (error) => {
            toast({
                description: error.message,
                variant: "destructive",
            });
        },
    });
};