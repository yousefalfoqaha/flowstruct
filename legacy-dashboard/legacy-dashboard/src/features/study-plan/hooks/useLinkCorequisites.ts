import {useQueryClient} from "@tanstack/react-query";
import {linkCorequisites} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useLinkCorequisites = () => {
    const queryClient = useQueryClient();

    return useAppMutation(linkCorequisites, {
        onSuccess: (data) => queryClient.setQueryData(studyPlanKeys.detail(data.id), data)
    });
}
