import {useQueryClient} from "@tanstack/react-query";
import {placeCourses} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const usePlaceCourses = () => {
    const queryClient = useQueryClient();
    return useAppMutation(placeCourses, {
        onSuccess: (data) => queryClient.setQueryData(studyPlanKeys.detail(data.id), data)
    });
}
