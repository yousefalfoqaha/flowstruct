import {useQueryClient} from "@tanstack/react-query";
import {unlinkCorequisite} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useUnlinkCorequisite = () => {
    const queryClient = useQueryClient();

    return useAppMutation(unlinkCorequisite, {
        onSuccess: (data) => queryClient.setQueryData(studyPlanKeys.detail(data.id), data)
    });
}
