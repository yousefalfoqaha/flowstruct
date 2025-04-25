import {useQueryClient} from "@tanstack/react-query";
import {assignCourseCorequisites} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useAssignCourseCorequisites = () => {
    const queryClient = useQueryClient();

    return useAppMutation(assignCourseCorequisites, {
        onSuccess: (data) => queryClient.setQueryData(studyPlanKeys.detail(data.id), data)
    });
}
