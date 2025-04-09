import {useQueryClient} from "@tanstack/react-query";
import {StudyPlan, StudyPlanListItem} from "@/features/study-plan/types.ts";
import {updateStudyPlanDetails} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useEditStudyPlanDetails = () => {
    const queryClient = useQueryClient();
    return useAppMutation(updateStudyPlanDetails, {
        onSuccess: (updatedStudyPlan: Partial<StudyPlan>) => {
            queryClient.setQueryData(
                studyPlanKeys.list(updatedStudyPlan.program as number),
                (previous: StudyPlanListItem[]) => {
                    return previous.map(studyPlan =>
                        studyPlan.id === updatedStudyPlan.id ? updatedStudyPlan : studyPlan
                    );
                }
            );

            const detailedStudyPlan: StudyPlan | undefined = queryClient.getQueryData(studyPlanKeys.detail(updatedStudyPlan.id as number));
            if (!detailedStudyPlan) return;

            queryClient.setQueryData(studyPlanKeys.detail(updatedStudyPlan.id as number), {
                ...detailedStudyPlan,
                duration: updatedStudyPlan.duration,
                track: updatedStudyPlan.track,
                year: updatedStudyPlan.year,
            });
        },
        successNotification: {message: "Study plan details updated successfully."}
    })
};
