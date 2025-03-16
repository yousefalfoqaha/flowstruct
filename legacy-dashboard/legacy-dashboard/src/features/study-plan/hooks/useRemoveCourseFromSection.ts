import {useMutation, useQueryClient} from "@tanstack/react-query";
import {removeCoursesFromSectionRequest} from "@/features/study-plan/api.ts";
import {Course} from "@/features/course/types.ts";
import {notifications} from "@mantine/notifications";

export const useRemoveCoursesFromSection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeCoursesFromSectionRequest,
        onSuccess: (updatedStudyPlan, {courseIds}) => {
            const courses = queryClient.getQueryData<Record<number, Course>>(["courses"]);
            if (!courses) return;

            queryClient.setQueryData(["study-plan", "detail", updatedStudyPlan.id], updatedStudyPlan);

            notifications.show({
                title: "Success!",
                message: `${courseIds.length} courses were removed successfully.`,
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