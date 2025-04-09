import {useQueryClient} from "@tanstack/react-query";
import {addCoursesToSection} from "@/features/study-plan/api.ts";
import {Course} from "@/features/course/types.ts";
import {studyPlanKeys} from "@/features/study-plan/queries.ts";
import {courseKeys} from "@/features/course/queries.ts";
import {useAppMutation} from "@/shared/hooks/useAppMutation.ts";

export const useAddCoursesToSection = () => {
    const queryClient = useQueryClient();
    return useAppMutation(addCoursesToSection, {
        onSuccess: (updatedStudyPlan, {addedCourses}) => {
            queryClient.setQueryData(courseKeys.all, (previous: Record<number, Course> = {}) => {
                return {
                    ...previous,
                    ...Object.fromEntries(addedCourses.map(course => [course.id, course]))
                };
            });

            queryClient.setQueryData(studyPlanKeys.detail(updatedStudyPlan.id), updatedStudyPlan);
        },
        successNotification: {message: "Courses added to study plan successfully."}
    });
};
