import {useMutation, useQueryClient} from "@tanstack/react-query";
import {StudyPlanListItem} from "@/features/study-plan/types.ts";
import {createStudyPlanRequest} from "@/features/study-plan/api.ts";
import {notifications} from "@mantine/notifications";

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

            notifications.show({
                title: "Success!",
                message: "Study plan created successfully",
                color: "green"
            });
        },
        onError: (error) => {
            notifications.show({
                title: "An error occurred.",
                message: error.message,
                color: "red",
            });
        }
    });
};