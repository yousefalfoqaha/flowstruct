import {useQueryClient} from "@tanstack/react-query";
import {moveCourseToSection} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useMoveCourseToSection = () => {
    const queryClient = useQueryClient();

    return useAppMutation(moveCourseToSection, {
        onSuccess: (data) => queryClient.setQueryData(studyPlanKeys.detail(data.id), data),
        successNotification: {message: "Course section changed."}
    });
}
