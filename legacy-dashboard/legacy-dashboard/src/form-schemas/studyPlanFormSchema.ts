import {z} from "zod";

const date = new Date();
const currentYear = date.getFullYear();

export const editStudyPlanFormSchema = z.object({
    id: z.number(),
    year: z
        .union([z.string(), z.number()])
        .transform((val) => Number(val))
        .refine((val) => Number.isInteger(val), {message: "Year must be an integer"}),
    track: z.string(),
    program: z.number()
});