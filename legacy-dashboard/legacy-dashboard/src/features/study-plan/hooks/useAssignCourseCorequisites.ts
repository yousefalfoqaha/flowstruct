import {useMutation, useQueryClient} from "@tanstack/react-query";
import {assignCourseCorequisitesRequest} from "@/features/study-plan/api.ts";
import {notifications} from "@mantine/notifications";

export const useAssignCourseCorequisites = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: assignCourseCorequisitesRequest,
        onSuccess: (updatedStudyPlan) => {
            queryClient.setQueryData(["study-plan", "detail", updatedStudyPlan.id], updatedStudyPlan);

            notifications.show({
                title: "Success!",
                message: "Corequisites assigned successfully.",
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