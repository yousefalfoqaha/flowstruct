import {useMutation, useQueryClient} from "@tanstack/react-query";
import {moveSection} from "@/features/study-plan/api.ts";
import {notifications} from "@mantine/notifications";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";

export const useMoveSection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: moveSection,
        onSuccess: (updatedStudyPlan) => {
            queryClient.setQueryData(studyPlanKeys.detail(updatedStudyPlan.id), updatedStudyPlan);
        },
        onError: (error) => {
            notifications.show({
                title: "An error occurred.",
                message: error.message,
                color: "red",
            });
        },
    })
}
