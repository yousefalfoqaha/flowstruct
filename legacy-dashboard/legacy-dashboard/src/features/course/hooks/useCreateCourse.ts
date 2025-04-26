import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";
import {createCourse} from "@/features/course/api.ts";
import {useQueryClient} from "@tanstack/react-query";
import {courseKeys} from "@/features/course/queries.ts";

export const useCreateCourse = () => {
    const queryClient = useQueryClient();

    return useAppMutation(createCourse, {
        onSuccess: (data) => {
            queryClient.setQueryData(courseKeys.detail(data.id), data);
            queryClient.invalidateQueries({queryKey: courseKeys.lists()});
        },
        successNotification: {
            message: (data) => `Course ${data.code} created.`
        }
    });
};
