import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourseRequest } from "@/features/course/api.ts";
import { Course } from "@/features/course/types.ts";

export const useCreateCourse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCourseRequest,
        onSuccess: (newCourse: Course) => {
            queryClient.setQueryData(
                ["courses"],
                (previous: Record<number, Course> = {}) => {
                    return {
                        ...previous,
                        [newCourse.id]: newCourse,
                    };
                }
            );
        }
    });
};
