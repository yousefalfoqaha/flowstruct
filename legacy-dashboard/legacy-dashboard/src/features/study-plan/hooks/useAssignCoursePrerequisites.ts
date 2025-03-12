import {useMutation, useQueryClient} from "@tanstack/react-query";
import {assignCoursePrerequisitesRequest} from "@/features/study-plan/api.ts";
import {notifications} from "@mantine/notifications";

export const useAssignCoursePrerequisites = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: assignCoursePrerequisitesRequest,
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
    });
}