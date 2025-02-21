import {useForm} from "react-hook-form";
import {z} from "zod";
import {searchCourseFormSchema} from "@/features/course/form-schemas.ts";
import {zodResolver} from "@hookform/resolvers/zod";

export const useSearchCoursesForm = () => {
    return useForm<z.infer<typeof searchCourseFormSchema>>({
        resolver: zodResolver(searchCourseFormSchema),
        defaultValues: {code: "", name: ""},
    });
}