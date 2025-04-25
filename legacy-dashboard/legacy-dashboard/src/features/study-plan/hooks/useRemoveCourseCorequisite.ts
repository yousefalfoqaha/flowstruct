import {useQueryClient} from "@tanstack/react-query";
import {removeCourseCorequisite} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useRemoveCourseCorequisite = () => {
    const queryClient = useQueryClient();

    return useAppMutation(removeCourseCorequisite, {
        onSuccess: (data) => queryClient.setQueryData(studyPlanKeys.detail(data.id), data)
    });
}
