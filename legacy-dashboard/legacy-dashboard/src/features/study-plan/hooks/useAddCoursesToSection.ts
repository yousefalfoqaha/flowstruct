import {useQueryClient} from "@tanstack/react-query";
import {addCoursesToSection} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useAddCoursesToSection = () => {
    const queryClient = useQueryClient();

    return useAppMutation(addCoursesToSection, {
        onSuccess: (data) => queryClient.invalidateQueries({queryKey: studyPlanKeys.detail(data.id)}),
        successNotification: {message: "Course(s) added to study plan."}
    });
};
