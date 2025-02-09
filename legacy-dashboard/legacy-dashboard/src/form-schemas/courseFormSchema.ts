import {z} from "zod";

export const searchCourseFormSchema = z.object({
    code: z.string().transform((val) => (val ?? '')),
    name: z.string().transform((val) => (val ?? ''))
});