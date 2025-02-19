import {z} from "zod";

export const editStudyPlanFormSchema = z.object({
    year: z
        .union([z.string(), z.number()])
        .transform((val) => Number(val))
        .refine((val) => Number.isInteger(val), {message: "Year must be an integer"}),
    duration: z
        .union([z.string(), z.number()])
        .transform((val) => Number(val))
        .refine((val) => Number.isInteger(val), {message: "Year must be an integer"})
        .refine((val) => val >= 1, {message: "Study plan must be at least 1 year"}),
    track: z
        .string()
        .trim()
        .transform((val) => (val === "" ? null : val))
        .nullable()
        .optional()
});

export const createStudyPlanFormSchema = z.object({
    year: z
        .union([z.string(), z.number()])
        .transform((val) => Number(val))
        .refine((val) => Number.isInteger(val), {message: "Year must be an integer"}),
    duration: z
        .union([z.string(), z.number()])
        .transform((val) => Number(val))
        .refine((val) => Number.isInteger(val), {message: "Year must be an integer"})
        .refine((val) => val >= 1, {message: "Duration must be at least 1 year"}),
    track: z
        .string()
        .trim()
        .transform((val) => (val === "" ? null : val))
        .nullable()
        .optional()
});