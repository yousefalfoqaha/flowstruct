import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteSectionRequest} from "@/features/study-plan/api.ts";
import {notifications} from "@mantine/notifications";

export const useDeleteSection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteSectionRequest,
        onSuccess: (updatedStudyPlan) => {
            queryClient.setQueryData(["study-plan", "detail", updatedStudyPlan.id], updatedStudyPlan);

            notifications.show({
                title: "Success!",
                message: `Section was removed successfully.`,
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
}