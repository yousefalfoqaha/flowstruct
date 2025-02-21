import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@/shared/hooks/useToast.ts";
import {StudyPlanListItem} from "@/features/study-plan/types.ts";
import {toggleStudyPlanVisibilityRequest} from "@/features/study-plan/api.ts";

export const useToggleStudyPlanVisibility = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleStudyPlanVisibilityRequest,
        onSuccess: (_, updatedStudyPlan) => {
            queryClient.setQueryData(
                ["study-plans", "list", updatedStudyPlan.program],
                (previous: StudyPlanListItem[]) => {
                    return previous.map(sp => (
                        sp.id === updatedStudyPlan.id ? {...sp, isPrivate: !sp.isPrivate} : sp
                    ));
                });

            toast({
                title: updatedStudyPlan.isPrivate ? 'Study plan has been made public.' : 'Study plan has been made private.',
                description: updatedStudyPlan.isPrivate ? 'Latest changes will be public.' : 'Latest changes will be private.'
            });
        }
    });
}