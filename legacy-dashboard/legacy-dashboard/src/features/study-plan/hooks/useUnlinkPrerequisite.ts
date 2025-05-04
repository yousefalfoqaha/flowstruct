import {useQueryClient} from "@tanstack/react-query";
import {unlinkPrerequisite} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useUnlinkPrerequisite = () => {
    const queryClient = useQueryClient();
    return useAppMutation(unlinkPrerequisite, {
        onSuccess: (data) => queryClient.setQueryData(studyPlanKeys.detail(data.id), data)
    });
}
