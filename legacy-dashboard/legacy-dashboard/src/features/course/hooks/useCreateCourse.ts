import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";
import {createCourse} from "@/features/course/api.ts";

export const useCreateCourse = () => {
    return useAppMutation(createCourse, {
        successNotification: {
            message: (data) => `Course ${data.code} created.`
        }
    });
};
