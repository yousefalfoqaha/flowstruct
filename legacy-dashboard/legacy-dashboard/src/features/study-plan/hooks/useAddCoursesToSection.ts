import {useMutation, useQueryClient} from "@tanstack/react-query";
import {StudyPlan} from "@/features/study-plan/types.ts";
import {addCoursesToSectionRequest} from "@/features/study-plan/api.ts";
import {Course} from "@/features/course/types.ts";
import {notifications} from "@mantine/notifications";

export const useAddCoursesToSection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addCoursesToSectionRequest,
        onSuccess: (updatedStudyPlan: StudyPlan, {addedCourses}) => {
            queryClient.setQueryData(["courses"], (previous: Record<number, Course> = {}) => {
                return {
                    ...previous,
                    ...Object.fromEntries(addedCourses.map(course => [course.id, course]))
                };
            });

            queryClient.setQueryData(["study-plan", updatedStudyPlan.id], updatedStudyPlan);

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
                variant: "destructive",
            });
        },
    });
};

