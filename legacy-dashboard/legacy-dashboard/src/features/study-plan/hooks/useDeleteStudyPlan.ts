import {useMutation, useQueryClient} from "@tanstack/react-query";
import {StudyPlanListItem} from "@/features/study-plan/types.ts";
import {deleteStudyPlanRequest} from "@/features/study-plan/api.ts";
import {notifications} from "@mantine/notifications";

export const useDeleteStudyPlan = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteStudyPlanRequest,
        onSuccess: (_, deletedStudyPlan) => {
            queryClient.setQueryData(
                ["study-plans", "list", deletedStudyPlan.program],
                (previous: StudyPlanListItem[]) => {
                    return previous.filter((plan) => plan.id !== deletedStudyPlan.id);
                }
            );

            queryClient.removeQueries({queryKey: ["study-plan", deletedStudyPlan.id]});

            notifications.show({
                title: "Success!",
                message: "Study plan deleted successfully",
                color: "green"
            });
        },
        onError: (error) => {
            notifications.show({
                title: "An error occurred.",
                message: error.message,
                variant: "destructive",
            });
        },
    });
}