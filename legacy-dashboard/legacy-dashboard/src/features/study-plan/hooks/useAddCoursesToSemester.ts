import {useQueryClient} from "@tanstack/react-query";
import {placeCoursesInSemester} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const usePlaceCoursesInSemester = () => {
    const queryClient = useQueryClient();
    return useAppMutation(placeCoursesInSemester, {
        onSuccess: (data) => queryClient.setQueryData(studyPlanKeys.detail(data.id), data)
    });
}
