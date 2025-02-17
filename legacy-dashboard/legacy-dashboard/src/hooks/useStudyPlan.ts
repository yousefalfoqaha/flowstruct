import {useMutation, useQueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {getStudyPlan} from "@/queries/getStudyPlan.ts";
import {useParams} from "@tanstack/react-router";
import {getStudyPlanCourses} from "@/queries/getStudyPlanCourses.ts";
import {Course, Section, StudyPlan} from "@/types";
import {toast} from "@/hooks/use-toast.ts";

export const useStudyPlan = () => {
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? '');

    if (!studyPlanId) {
        throw new Error("Study plan data must be used inside a page with a valid study plan path variable.");
    }

    const queryClient = useQueryClient();

    const studyPlan = useSuspenseQuery(getStudyPlan(studyPlanId));

    const courses = useSuspenseQuery(
        getStudyPlanCourses(
            studyPlan.data.id,
            studyPlan.data.sections.flatMap(section => Array.from(section.courses))
    ));

    const addCoursesToSection = useMutation({
        mutationFn: async ({addedCourses, section}: { addedCourses: Record<number, Course>, section: Section }) => {
            const response = await fetch(
                `http://localhost:8080/api/v1/study-plans/${studyPlanId}/sections/${section.id}/courses`,
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        courseIds: Object.keys(addedCourses),
                        sectionId: section.id,
                    }),
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "An error occurred.");
            }
            return response.json();
        },
        onSuccess: (updatedStudyPlan: StudyPlan, addedCourses) => {
            queryClient.setQueryData(["study-plan", updatedStudyPlan.id], updatedStudyPlan);
            queryClient.setQueryData(
                ['study-plan', updatedStudyPlan.id, 'courses'],
                (oldCourses: Record<number, Course> = {}) => ({
                    ...oldCourses,
                    ...addedCourses
                })
            );
        },
        onError: (error) => {
            toast({description: error.message, variant: "destructive"});
        },
    });

    return {studyPlan, courses, addCoursesToSection};
};
