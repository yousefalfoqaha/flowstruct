import {useForm} from "react-hook-form";
import {z} from "zod";
import {editSectionFormSchema} from "@/features/study-plan/form-schemas.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Section} from "@/features/study-plan/types.ts";

export const useEditSectionDetailsForm = (section: Section) => {
    return useForm<z.infer<typeof editSectionFormSchema>>({
        resolver: zodResolver(editSectionFormSchema),
        defaultValues: {...section}
    });
}