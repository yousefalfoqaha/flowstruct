import {useMutation, useQueryClient} from "@tanstack/react-query";
import {removeCourseFromSectionRequest} from "@/features/study-plan/api.ts";
import {Course} from "@/features/course/types.ts";
import {notifications} from "@mantine/notifications";

export const useRemoveCourseFromSection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeCourseFromSectionRequest,
        onSuccess: (updatedStudyPlan, {courseId}) => {
            const courses = queryClient.getQueryData<Record<number, Course>>(["courses"]);
            if (!courses) return;

            const removedCourse = courses[courseId];

            if (!removedCourse) {
                notifications.show({message: "Course was not found."});
            }

            queryClient.setQueryData(["courses"], (previous: Record<number, Course> = {}) => {
                const updatedCourses = {...previous};
                delete updatedCourses[courseId];
                return updatedCourses;
            });

            queryClient.setQueryData(["study-plan", "detail", updatedStudyPlan.id], updatedStudyPlan);

            notifications.show({
                title: "Success!",
                message: `${removedCourse.code} ${removedCourse.name} was removed successfully.`,
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