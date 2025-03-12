import {useMutation, useQueryClient} from "@tanstack/react-query";
import {removeCoursePrerequisiteRequest} from "@/features/study-plan/api.ts";
import {notifications} from "@mantine/notifications";

export const useRemoveCoursePrerequisite = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeCoursePrerequisiteRequest,
        onSuccess: (updatedStudyPlan) => {
            queryClient.setQueryData(["study-plan", "detail", updatedStudyPlan.id], updatedStudyPlan);

            notifications.show({
                title: "Success!",
                message: "Prerequisites assigned successfully.",
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
    })
}