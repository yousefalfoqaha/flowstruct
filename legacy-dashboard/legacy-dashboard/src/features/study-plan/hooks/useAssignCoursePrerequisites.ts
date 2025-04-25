import {useQueryClient} from "@tanstack/react-query";
import {assignCoursePrerequisites} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useAssignCoursePrerequisites = () => {
    const queryClient = useQueryClient();

    return useAppMutation(assignCoursePrerequisites, {
        onSuccess: (data) => queryClient.setQueryData(studyPlanKeys.detail(data.id), data)
    });
}
