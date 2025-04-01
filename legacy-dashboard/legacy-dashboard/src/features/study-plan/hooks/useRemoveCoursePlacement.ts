import {useMutation, useQueryClient} from "@tanstack/react-query";
import {removeCoursePlacementRequest} from "@/features/study-plan/api.ts";
import {notifications} from "@mantine/notifications";

export const useRemoveCoursePlacement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeCoursePlacementRequest,
        onSuccess: (updatedStudyPlan) => {
            queryClient.setQueryData(["study-plan", "detail", updatedStudyPlan.id], updatedStudyPlan);

            notifications.show({
                title: "Success!",
                message: "Removed course from semester successfully.",
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