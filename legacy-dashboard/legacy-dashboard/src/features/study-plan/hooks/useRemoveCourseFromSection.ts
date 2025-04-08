import {useMutation, useQueryClient} from "@tanstack/react-query";
import {removeCoursesFromSection} from "@/features/study-plan/api.ts";
import {Course} from "@/features/course/types.ts";
import {notifications} from "@mantine/notifications";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {courseKeys} from "@/features/course/queries.ts";

export const useRemoveCoursesFromSection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeCoursesFromSection,
        onSuccess: (updatedStudyPlan, {courseIds}) => {
            const courses = queryClient.getQueryData<Record<number, Course>>(courseKeys.all);
            if (!courses) return;

            queryClient.setQueryData(studyPlanKeys.detail(updatedStudyPlan.id), updatedStudyPlan);

            notifications.show({
                title: "Success!",
                message: `${courseIds.length} courses were removed successfully.`,
                color: "green"
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
