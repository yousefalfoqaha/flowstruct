import {useMutation, useQueryClient} from "@tanstack/react-query";
import {StudyPlanListItem} from "@/features/study-plan/types.ts";
import {deleteStudyPlan} from "@/features/study-plan/api.ts";
import {notifications} from "@mantine/notifications";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";

export const useDeleteStudyPlan = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteStudyPlan,
        onSuccess: (_, deletedStudyPlan) => {
            queryClient.setQueryData(
                studyPlanKeys.list(deletedStudyPlan.program),
                (previous: StudyPlanListItem[]) => {
                    return previous.filter((plan) => plan.id !== deletedStudyPlan.id);
                }
            );

            queryClient.removeQueries({queryKey: studyPlanKeys.detail(deletedStudyPlan.id)});

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
                color: "red",
            });
        },
    });
}