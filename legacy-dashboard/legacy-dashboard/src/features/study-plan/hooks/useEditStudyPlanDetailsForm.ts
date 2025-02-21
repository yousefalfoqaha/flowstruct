import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {editStudyPlanFormSchema} from "@/features/study-plan/form-schemas.ts";
import {StudyPlan} from "@/features/study-plan/types.ts";

export const useEditStudyPlanDetailsForm = (studyPlan: Partial<StudyPlan> | null) => {
    return useForm<z.infer<typeof editStudyPlanFormSchema>>({
        resolver: zodResolver(editStudyPlanFormSchema),
        defaultValues: {...studyPlan}
    });
}