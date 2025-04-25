import {useQueryClient} from "@tanstack/react-query";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";
import {editCourseDetails} from "@/features/course/api.ts";
import {courseKeys} from "@/features/course/queries.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";

export const useEditCourseDetails = () => {
    const queryClient = useQueryClient();

    return useAppMutation(editCourseDetails, {
        onSuccess: (data) => {
            queryClient.setQueryData(courseKeys.detail(data.id), data);
            queryClient.invalidateQueries({queryKey: studyPlanKeys.details()});
        },
        successNotification: {message: (data) => `Updated ${data.code} details.`}
    });
}