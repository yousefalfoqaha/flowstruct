import {useMutation, useQueryClient} from "@tanstack/react-query";
import {editSectionDetailsRequest} from "@/features/study-plan/api.ts";
import {notifications} from "@mantine/notifications";

export const useEditSectionDetails = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editSectionDetailsRequest,
        onSuccess: ((updatedStudyPlan) => {
            queryClient.setQueryData(["study-plan", "detail", updatedStudyPlan.id], updatedStudyPlan);

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