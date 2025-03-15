import {useMutation, useQueryClient} from "@tanstack/react-query";
import {moveCourseSectionRequest} from "@/features/study-plan/api.ts";
import {notifications} from "@mantine/notifications";

export const useMoveCourseSection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: moveCourseSectionRequest,
        onSuccess: (updatedStudyPlan) => {
            queryClient.setQueryData(["study-plan", "detail", updatedStudyPlan.id], updatedStudyPlan);

            notifications.show({
                title: "Success!",
                message: "Changed course section successfully.",
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