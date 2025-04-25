import {useQueryClient} from "@tanstack/react-query";
import {removeCoursesFromSection} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useRemoveCoursesFromSection = () => {
    const queryClient = useQueryClient();

    return useAppMutation(removeCoursesFromSection, {
        onSuccess: (_, {studyPlanId}) => (
            queryClient.invalidateQueries({queryKey: studyPlanKeys.detail(studyPlanId)})
        ),
        successNotification: {
            message: (_, {courseIds}) =>
                `${courseIds.length} course(s) removed from study plan.`
        }
    });
}
