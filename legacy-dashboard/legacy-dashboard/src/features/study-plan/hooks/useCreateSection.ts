import {useMutation, useQueryClient} from "@tanstack/react-query";
import {StudyPlan} from "@/features/study-plan/types.ts";
import {createSectionRequest} from "@/features/study-plan/api.ts";
import {notifications} from "@mantine/notifications";

export const useCreateSection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createSectionRequest,
        onSuccess: ((updatedStudyPlan: StudyPlan) => {
            queryClient.setQueryData(["study-plan", "detail", updatedStudyPlan.id], updatedStudyPlan);

            notifications.show({
                title: "Success!",
                message: "Section created successfully",
                color: "green"
            });
        }),
        onError: (error) => {
            notifications.show({
                title: "An error occurred.",
                message: error.message,
                variant: "destructive",
            });
        }
    });
}