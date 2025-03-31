import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addCoursesToSemesterRequest} from "@/features/study-plan/api.ts";
import {notifications} from "@mantine/notifications";

export const useAddCoursesToSemester = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addCoursesToSemesterRequest,
        onSuccess: (updatedStudyPlan) => {
            queryClient.setQueryData(["study-plan", "detail", updatedStudyPlan.id], updatedStudyPlan);

            notifications.show({
                title: "Success!",
                message: "Courses added to semester successfully.",
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