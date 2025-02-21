import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {editProgramFormSchema} from "@/features/program/form-schemas.ts";
import {Program} from "@/features/program/types.ts";

export const useEditProgramDetailsForm = (program: Partial<Program> | null) => {
    return useForm<z.infer<typeof editProgramFormSchema>>({
        resolver: zodResolver(editProgramFormSchema),
        defaultValues: {...program}
    });
}
