import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createCourseRequest} from "@/features/course/api.ts";
import {Course} from "@/features/course/types.ts";
import {notifications} from "@mantine/notifications";

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
