import {useQueryClient} from "@tanstack/react-query";
import {unlinkCorequisiteFromCourse} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useUnlinkCorequisiteFromCourse = () => {
    const queryClient = useQueryClient();

    return useAppMutation(unlinkCorequisiteFromCourse, {
        onSuccess: (data) => queryClient.setQueryData(studyPlanKeys.detail(data.id), data)
    });
}
