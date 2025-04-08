import {useMutation, useQueryClient} from "@tanstack/react-query";
import {StudyPlan, StudyPlanListItem} from "@/features/study-plan/types.ts";
import {toggleStudyPlanVisibility} from "@/features/study-plan/api.ts";
import {notifications} from "@mantine/notifications";
import {Eye, EyeOff} from "lucide-react";
import React from "react";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";

export const useToggleStudyPlanVisibility = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleStudyPlanVisibility,
        onSuccess: (updatedStudyPlan) => {
            queryClient.setQueryData(
                studyPlanKeys.list(updatedStudyPlan.program),
                (previous: StudyPlanListItem[]) => {
                    if (!previous) return [];
                    return previous.map(sp => (
                        sp.id === updatedStudyPlan.id ? {...sp, isPrivate: !sp.isPrivate} : sp
                    ));
                });

            queryClient.setQueryData(
                studyPlanKeys.detail(updatedStudyPlan.id), (studyPlan: Partial<StudyPlan>) => {
                    return {...studyPlan, isPrivate: !studyPlan.isPrivate}
                }
            );

            notifications.show({
                title: updatedStudyPlan.isPrivate ? 'Study plan has been made public.' : 'Study plan has been made private.',
                message: updatedStudyPlan.isPrivate ? 'Latest changes will be public.' : 'Latest changes will be private.',
                icon: React.createElement(updatedStudyPlan.isPrivate ? Eye : EyeOff, {size: 18})
            });
        },
        onError: (error) => {
            notifications.show({
                title: "An error occurred.",
                message: error.message,
                color: "red",
            });
        },
    });
}
