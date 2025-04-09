import {useQueryClient} from "@tanstack/react-query";
import {StudyPlanListItem} from "@/features/study-plan/types.ts";
import {createStudyPlan} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useCreateStudyPlan = () => {
    const queryClient = useQueryClient();
    return useAppMutation(createStudyPlan, {
        onSuccess: (newStudyPlan) => {
            queryClient.setQueryData(
                studyPlanKeys.list(newStudyPlan.program),
                (studyPlans: StudyPlanListItem[]) => {
                    return [...studyPlans, newStudyPlan];
                });
        },
        successNotification: {message: "Study plan created successfully."}
    });
};
