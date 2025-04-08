import {useMutation, useQueryClient} from "@tanstack/react-query";
import {StudyPlanListItem} from "@/features/study-plan/types.ts";
import {createStudyPlan} from "@/features/study-plan/api.ts";
import {notifications} from "@mantine/notifications";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";

export const useCreateStudyPlan = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createStudyPlan,
        onSuccess: (newStudyPlan: StudyPlanListItem) => {
            queryClient.setQueryData(
                studyPlanKeys.list(newStudyPlan.program),
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
