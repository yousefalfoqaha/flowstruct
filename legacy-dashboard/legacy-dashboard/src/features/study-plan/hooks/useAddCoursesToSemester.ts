import {useQueryClient} from "@tanstack/react-query";
import {placeSemesterCourses} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const usePlaceSemesterCourses = () => {
    const queryClient = useQueryClient();
    return useAppMutation(placeSemesterCourses, {
        onSuccess: (data) => queryClient.setQueryData(studyPlanKeys.detail(data.id), data)
    });
}
