import {useQueryClient} from "@tanstack/react-query";
import {linkPrerequisitesToCourse} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useLinkPrerequisitesToCourse = () => {
    const queryClient = useQueryClient();

    return useAppMutation(linkPrerequisitesToCourse, {
        onSuccess: (data) => {
            queryClient.setQueryData(studyPlanKeys.detail(data.id), data);
            queryClient.invalidateQueries({queryKey: studyPlanKeys.list()});
        }
    });
}
