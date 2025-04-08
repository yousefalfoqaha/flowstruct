import {useMutation, useQueryClient} from "@tanstack/react-query";
import {editSectionDetails} from "@/features/study-plan/api.ts";
import {notifications} from "@mantine/notifications";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";

export const useEditSectionDetails = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editSectionDetails,
        onSuccess: (updatedStudyPlan => {
            queryClient.setQueryData(studyPlanKeys.detail(updatedStudyPlan.id), updatedStudyPlan);

            notifications.show({
                title: "Success!",
                message: "Section details updated successfully",
                color: "green"
            });
        }),
        onError: (error) => notifications.show({
            title: "An error occurred.",
            message: error.message,
            color: "red",
        })
    });
}
