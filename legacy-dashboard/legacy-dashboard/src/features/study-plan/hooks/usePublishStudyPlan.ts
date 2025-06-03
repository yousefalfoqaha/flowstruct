import {useQueryClient} from "@tanstack/react-query";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";
import {publishStudyPlan} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";

export const usePublishStudyPlan = () => {
    const queryClient = useQueryClient();

    return useAppMutation(publishStudyPlan, {
        onSuccess: (data) => {
            queryClient.setQueryData(studyPlanKeys.detail(data.id), data);
            queryClient.invalidateQueries({queryKey: studyPlanKeys.list()});
        }
    })
}
