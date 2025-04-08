import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteSection} from "@/features/study-plan/api.ts";
import {notifications} from "@mantine/notifications";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";

export const useDeleteSection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteSection,
        onSuccess: (updatedStudyPlan) => {
            queryClient.setQueryData(studyPlanKeys.detail(updatedStudyPlan.id), updatedStudyPlan);

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