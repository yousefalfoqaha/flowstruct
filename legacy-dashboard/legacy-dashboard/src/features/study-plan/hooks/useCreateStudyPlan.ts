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
                studyPlanKeys.lists(),
                (studyPlans: StudyPlanListItem[]) => {
                    return [
                        ...studyPlans,
                        {
                            id: newStudyPlan.id,
                            year: newStudyPlan.year,
                            duration: newStudyPlan.duration,
                            track: newStudyPlan.track,
                            isPrivate: newStudyPlan.isPrivate,
                            program: newStudyPlan.program
                        }
                    ];
                });

            queryClient.setQueryData(studyPlanKeys.detail(newStudyPlan.id), newStudyPlan);
        },
        successNotification: {message: "Study plan created successfully."}
    });
};
