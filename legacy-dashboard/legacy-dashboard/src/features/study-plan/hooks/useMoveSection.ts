import {useMutation, useQueryClient} from "@tanstack/react-query";
import {moveSectionRequest} from "@/features/study-plan/api.ts";
import {notifications} from "@mantine/notifications";

export const useMoveSection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: moveSectionRequest,
        onSuccess: (updatedStudyPlan) => {
            queryClient.setQueryData(["study-plan", "detail", updatedStudyPlan.id], updatedStudyPlan);
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