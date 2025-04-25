import {useQueryClient} from "@tanstack/react-query";
import {moveCourseSection} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useMoveCourseSection = () => {
    const queryClient = useQueryClient();
    return useAppMutation(moveCourseSection, {
        onSuccess: (updatedStudyPlan) => queryClient.setQueryData(studyPlanKeys.detail(updatedStudyPlan.id), updatedStudyPlan),
        successNotification: {message: "Course section changed."}
    });
}
