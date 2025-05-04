import {useQueryClient} from "@tanstack/react-query";
import {linkPrerequisites} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useLinkPrerequisites = () => {
    const queryClient = useQueryClient();

    return useAppMutation(linkPrerequisites, {
        onSuccess: (data) => queryClient.setQueryData(studyPlanKeys.detail(data.id), data)
    });
}
