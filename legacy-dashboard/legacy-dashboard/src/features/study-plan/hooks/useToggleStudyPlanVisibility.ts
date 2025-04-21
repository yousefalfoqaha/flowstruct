import {useQueryClient} from "@tanstack/react-query";
import {StudyPlan, StudyPlanListItem} from "@/features/study-plan/types.ts";
import {toggleStudyPlanVisibility} from "@/features/study-plan/api.ts";
import {Eye, EyeOff} from "lucide-react";
import React from "react";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";
import {getStudyPlanDisplayName} from "@/utils/getStudyPlanDisplayName.ts";

export const useToggleStudyPlanVisibility = () => {
    const queryClient = useQueryClient();

    return useAppMutation(toggleStudyPlanVisibility, {
        onSuccess: (updatedStudyPlan) => {
            queryClient.setQueryData(
                studyPlanKeys.lists(),
                (previous: StudyPlanListItem[] | undefined) => {
                    if (!previous) return [];
                    return previous.map(sp =>
                        sp.id === updatedStudyPlan.id
                            ? {...sp, isPrivate: !sp.isPrivate}
                            : sp
                    );
                }
            );

            queryClient.setQueryData(
                studyPlanKeys.detail(updatedStudyPlan.id as number),
                (studyPlan: Partial<StudyPlan> | undefined) => {
                    return {
                        ...studyPlan,
                        isPrivate: !studyPlan?.isPrivate,
                    };
                }
            );
        },
        successNotification: {
            title: (data) =>
                `${getStudyPlanDisplayName(data)} ${data.isPrivate
                    ? "Study plan has been made public."
                    : "Study plan has been made private."}`,
            message: (data) =>
                data.isPrivate
                    ? "Latest changes will be public."
                    : "Latest changes will be private.",
            icon: (data) =>
                React.createElement(data.isPrivate ? Eye : EyeOff, {size: 18}),
        },
    });
};
