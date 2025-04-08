import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addCoursesToSection} from "@/features/study-plan/api.ts";
import {Course} from "@/features/course/types.ts";
import {notifications} from "@mantine/notifications";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {courseKeys} from "@/features/course/queries.ts";

export const useAddCoursesToSection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addCoursesToSection,
        onSuccess: (updatedStudyPlan, {addedCourses}) => {
            queryClient.setQueryData(courseKeys.all, (previous: Record<number, Course> = {}) => {
                return {
                    ...previous,
                    ...Object.fromEntries(addedCourses.map(course => [course.id, course]))
                };
            });

            queryClient.setQueryData(studyPlanKeys.detail(updatedStudyPlan.id), updatedStudyPlan);

            notifications.show({
                title: "Success!",
                message: "Courses added to section successfully.",
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
};
