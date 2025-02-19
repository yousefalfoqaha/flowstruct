import {useMutation, useQueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {getStudyPlan} from "@/queries/getStudyPlan.ts";
import {useParams} from "@tanstack/react-router";
import {Course, Section, StudyPlan, StudyPlanOption} from "@/types";
import {toast} from "@/hooks/use-toast.ts";
import {createSectionFormSchema} from "@/form-schemas/sectionFormSchema.ts";
import {z} from "zod";
import {editStudyPlanFormSchema} from "@/form-schemas/studyPlanFormSchema.ts";

export const useStudyPlan = () => {
    const studyPlanId = parseInt(useParams({strict: false}).studyPlanId ?? '');

    if (!studyPlanId) {
        throw new Error("Study plan data must be used inside a page with a valid study plan path variable.");
    }

    const queryClient = useQueryClient();

    const studyPlan = useSuspenseQuery(getStudyPlan(studyPlanId));

    const createSection = useMutation({
        mutationFn: async (newSection: z.infer<typeof createSectionFormSchema>) => {
            const response = await fetch(`http://localhost:8080/api/v1/study-plans/${studyPlanId}/create-section`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newSection)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An unknown error occurred');
            }

            return response.json();
        },
        onSuccess: ((updatedStudyPlan: StudyPlan) => {
            queryClient.setQueryData(["study-plan", updatedStudyPlan.id], updatedStudyPlan);
        }),
        onError: (error) => {
            toast({
                description: error.message,
                variant: 'destructive'
            });
        }
    });

    const addCoursesToSection = useMutation({
        mutationFn: async ({addedCourses, section}: { addedCourses: Course[], section: Section | null }) => {
            const response = await fetch(
                `http://localhost:8080/api/v1/study-plans/${studyPlanId}/sections/${section?.id}/courses`,
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        courseIds: addedCourses.map(c => c.id),
                        sectionId: section?.id,
                    }),
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "An error occurred.");
            }
            return response.json();
        },
        onSuccess: (updatedStudyPlan: StudyPlan, {addedCourses}) => {
            addedCourses.forEach(course => {
                queryClient.setQueryData(["courses", course.id], course);
            });
            queryClient.setQueryData(["study-plan", updatedStudyPlan.id], updatedStudyPlan);
        },
        onError: (error) => {
            toast({description: error.message, variant: "destructive"});
        },
    });

    return {
        studyPlan,
        editStudyPlan,
        addCoursesToSection,
        createSection
    };
};
