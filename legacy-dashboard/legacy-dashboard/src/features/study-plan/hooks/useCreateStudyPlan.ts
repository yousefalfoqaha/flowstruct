import {useQueryClient} from "@tanstack/react-query";
import {createStudyPlan} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useCreateStudyPlan = () => {
    const queryClient = useQueryClient();

    return useAppMutation(createStudyPlan, {
        onSuccess: () => queryClient.invalidateQueries({queryKey: studyPlanKeys.list()}),
        successNotification: {message: "Study plan created."}
    });
};
