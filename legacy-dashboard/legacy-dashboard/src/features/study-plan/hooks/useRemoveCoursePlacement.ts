import {useMutation, useQueryClient} from "@tanstack/react-query";
import {removeCoursePlacement} from "@/features/study-plan/api.ts";
import {notifications} from "@mantine/notifications";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";

export const useRemoveCoursePlacement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeCoursePlacement,
        onSuccess: (updatedStudyPlan) => {
            queryClient.setQueryData(studyPlanKeys.detail(updatedStudyPlan.id), updatedStudyPlan);

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