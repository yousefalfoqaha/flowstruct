import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {createStudyPlanFormSchema} from "@/features/study-plan/form-schemas.ts";

export const useCreateStudyPlanForm = () => {
    return useForm<z.infer<typeof createStudyPlanFormSchema>>({
        resolver: zodResolver(createStudyPlanFormSchema),
        defaultValues: {
            year: undefined,
            duration: undefined,
            track: undefined
        }
    });
}