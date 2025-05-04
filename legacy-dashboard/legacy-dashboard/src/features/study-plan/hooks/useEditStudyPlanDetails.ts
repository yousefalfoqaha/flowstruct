import {useQueryClient} from "@tanstack/react-query";
import {editStudyPlanDetails} from "@/features/study-plan/api.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useEditStudyPlanDetails = () => {
    const queryClient = useQueryClient();

    return useAppMutation(editStudyPlanDetails, {
        onSuccess: (data) => {
            queryClient.setQueryData(studyPlanKeys.detail(data.id), data);
            queryClient.invalidateQueries({queryKey: studyPlanKeys.list()});
        },
        successNotification: {
            message: "Study plan details updated."
        }
    })
};
