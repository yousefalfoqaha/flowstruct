import {useMutation, useQueryClient} from "@tanstack/react-query";
import {removeCourseCorequisiteRequest} from "@/features/study-plan/api.ts";
import {notifications} from "@mantine/notifications";

export const useRemoveCourseCorequisite = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeCourseCorequisiteRequest,
        onSuccess: (updatedStudyPlan) => {
            queryClient.setQueryData(["study-plan", "detail", updatedStudyPlan.id], updatedStudyPlan);

            notifications.show({
                title: "Success!",
                message: "Corequisite removed successfully.",
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