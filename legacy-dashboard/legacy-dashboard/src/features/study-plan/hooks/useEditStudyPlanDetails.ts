import {useMutation, useQueryClient} from "@tanstack/react-query";
import {StudyPlan, StudyPlanListItem} from "@/features/study-plan/types.ts";
import {updateStudyPlanDetails} from "@/features/study-plan/api.ts";
import {notifications} from "@mantine/notifications";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";

export const useEditStudyPlanDetails = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateStudyPlanDetails,
        onSuccess: (updatedStudyPlan: Partial<StudyPlan>) => {
            queryClient.setQueryData(
                studyPlanKeys.list(updatedStudyPlan.program),
                (previous: StudyPlanListItem[]) => {
                    return previous.map(studyPlan =>
                        studyPlan.id === updatedStudyPlan.id ? updatedStudyPlan : studyPlan
                    );
                }
            );

            const detailedStudyPlan = queryClient.getQueryData(studyPlanKeys.detail(updatedStudyPlan.id));

            if (detailedStudyPlan) {
                queryClient.setQueryData(studyPlanKeys.detail(updatedStudyPlan.id), {
                    ...detailedStudyPlan,
                    duration: updatedStudyPlan.duration,
                    track: updatedStudyPlan.track,
                    year: updatedStudyPlan.year,
                });
            }

            notifications.show({
                title: "Success!",
                message: "Study plan details updated successfully",
                color: "green"
            });
        },
        onError: (error) => {
            notifications.show({
                title: "An error occurred.",
                message: error.message,
                color: "red",
            });
        },
    });
};