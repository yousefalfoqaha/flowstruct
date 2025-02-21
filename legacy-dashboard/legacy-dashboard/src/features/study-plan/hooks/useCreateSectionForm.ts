import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {createSectionFormSchema} from "@/features/study-plan/form-schemas.ts";

export const useCreateSectionForm = () => {
    return useForm<z.infer<typeof createSectionFormSchema>>({
        resolver: zodResolver(createSectionFormSchema),
        defaultValues: {
            level: undefined,
            type: undefined,
            requiredCreditHours: 0,
            name: ''
        }
    });
}