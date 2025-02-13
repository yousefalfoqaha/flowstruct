import {z} from "zod";

export const searchCourseFormSchema = z.object({
    code: z.string().optional(),
    name: z.string().optional(),
}).refine(data => data.code || data.name, {
    message: "At least one field must be filled"
});