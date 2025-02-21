import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "@/shared/hooks/useToast.ts";
import {StudyPlan} from "@/features/study-plan/types.ts";
import {addCoursesToSectionRequest} from "@/features/study-plan/api.ts";
import {Course} from "@/features/course/types.ts";

export const useAddCoursesToSection = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addCoursesToSectionRequest,
        onSuccess: (updatedStudyPlan: StudyPlan, {addedCourses}) => {
            queryClient.setQueryData(["courses"], (previous: Record<number, Course> = {}) => {
                return {
                    ...previous,
                    ...Object.fromEntries(addedCourses.map(course => [course.id, course]))
                };
            });

            queryClient.setQueryData(["study-plan", updatedStudyPlan.id], updatedStudyPlan);

            toast({description: "Successfully added courses to section."});
        },
        onError: (error) => {
            toast({description: error.message, variant: "destructive"});
        },
    });
};

