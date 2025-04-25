import {useQueryClient} from "@tanstack/react-query";
import {StudyPlan, StudyPlanSummary} from "@/features/study-plan/types.ts";
import {updateStudyPlanDetails} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useEditStudyPlanDetails = () => {
    const queryClient = useQueryClient();

    return useAppMutation(updateStudyPlanDetails, {
        onSuccess: (updatedStudyPlan: StudyPlan) => {
            queryClient.setQueryData(
                studyPlanKeys.lists(),
                (previous: StudyPlanSummary[]) => {
                    return previous.map(studyPlan =>
                        studyPlan.id === updatedStudyPlan.id
                            ? {
                                id: updatedStudyPlan.id,
                                year: updatedStudyPlan.year,
                                duration: updatedStudyPlan.duration,
                                track: updatedStudyPlan.track,
                                isPrivate: updatedStudyPlan.isPrivate,
                                program: updatedStudyPlan.program
                            } : studyPlan
                    );
                }
            );

            queryClient.setQueryData(studyPlanKeys.detail(updatedStudyPlan.id), updatedStudyPlan);
        },
        successNotification: {message: "Study plan details updated."}
    })
};
