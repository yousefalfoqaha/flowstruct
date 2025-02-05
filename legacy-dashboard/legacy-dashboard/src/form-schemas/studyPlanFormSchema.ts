import {z} from "zod";

export const editStudyPlanFormSchema = z.object({
    id: z.number(),
    year: z
        .union([z.string(), z.number()])
        .transform((val) => Number(val))
        .refine((val) => Number.isInteger(val), {message: "Year must be an integer"}),
    track: z.string().nullable(),
    isPrivate: z.boolean(),
    program: z.number()
});

export const createStudyPlanFormSchema = z.object({
    year: z
        .union([z.string(), z.number()])
        .transform((val) => Number(val))
        .refine((val) => Number.isInteger(val), {message: "Year must be an integer"}),
    track: z.string().nullable(),
    isPrivate: z.boolean(),
    program: z.number()
});