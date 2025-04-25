import {useQueryClient} from "@tanstack/react-query";
import {toggleStudyPlanVisibility} from "@/features/study-plan/api.ts";
import {Eye, EyeOff} from "lucide-react";
import React from "react";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";
import {getStudyPlanDisplayName} from "@/utils/getStudyPlanDisplayName.ts";

export const useToggleStudyPlanVisibility = () => {
    const queryClient = useQueryClient();

    return useAppMutation(toggleStudyPlanVisibility, {
        onSuccess: (data) => {
            queryClient.setQueryData(studyPlanKeys.detail(data.id), data);
            queryClient.invalidateQueries({queryKey: studyPlanKeys.list()});
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
