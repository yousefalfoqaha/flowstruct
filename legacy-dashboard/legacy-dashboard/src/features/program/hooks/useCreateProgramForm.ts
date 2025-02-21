import {useForm} from "react-hook-form";
import {z} from "zod";
import {createProgramFormSchema} from "@/features/program/form-schemas.ts";
import {zodResolver} from "@hookform/resolvers/zod";

export const useCreateProgramForm = () => {
    return useForm<z.infer<typeof createProgramFormSchema>>({
        resolver: zodResolver(createProgramFormSchema),
        defaultValues: {
            code: '',
            name: '',
            degree: ''
        }
    });
};