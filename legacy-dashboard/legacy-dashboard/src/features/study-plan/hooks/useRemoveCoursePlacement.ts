import {useQueryClient} from "@tanstack/react-query";
import {removeCoursePlacement} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useRemoveCoursePlacement = () => {
    const queryClient = useQueryClient();

    return useAppMutation(removeCoursePlacement, {
        onSuccess: (data) => queryClient.setQueryData(studyPlanKeys.detail(data.id), data)
    });
}
