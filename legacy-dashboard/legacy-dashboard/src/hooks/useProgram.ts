import {useMutation, useQueryClient} from "@tanstack/react-query";
import {z} from "zod";
import {editStudyPlanFormSchema} from "@/form-schemas/studyPlanFormSchema.ts";
import {StudyPlanOption} from "@/types";
import {toast} from "@/hooks/use-toast.ts";

export const useProgram = () => {


    const queryClient = useQueryClient();

    const editStudyPlanDetails = useMutation({
        mutationFn: async (updatedStudyPlan: z.infer<typeof editStudyPlanFormSchema>) => {
            const response = await fetch(`http://localhost:8080/api/v1/study-plans/${updatedStudyPlan.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedStudyPlan)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred.');
            }

            return response.json();
        },
        onSuccess: (updatedStudyPlan: StudyPlanOption) => {
            queryClient.setQueryData(['study-plans', updatedStudyPlan.program], (oldStudyPlans: StudyPlanOption[] | undefined) => {
                if (!oldStudyPlans) return;

                return oldStudyPlans.map(sp => (
                        sp.id === updatedStudyPlan.id
                            ? updatedStudyPlan
                            : sp
                    )
                );
            });
        },
        onError: (error) => {
            toast({
                description: error.message,
                variant: 'destructive'
            });
        }
    });

    return {editStudyPlanDetails}
}