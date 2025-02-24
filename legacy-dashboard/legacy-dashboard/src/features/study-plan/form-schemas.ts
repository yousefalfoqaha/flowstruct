import {z} from "zod";
import {SectionLevel, SectionType} from "@/features/study-plan/types.ts";

export const studyPlanDetailsSchema = z.object({
    year: z.date(),
    duration: z.number().min(1, {message: "Must be at least 1 year"}),
    track: z
        .string()
        .trim()
        .transform((val) => (val === "" ? null : val))
        .nullable()
        .optional()
});

export type StudyPlanDetailsFormValues = z.infer<typeof studyPlanDetailsSchema>;

export const editSectionFormSchema = z.object({
    level: z.nativeEnum(SectionLevel),
    type: z.nativeEnum(SectionType),
    requiredCreditHours: z
        .union([z.string(), z.number()])
        .transform((val) => Number(val)),
    name: z.string().nullable()
});

export const createSectionFormSchema = z.object({
    level: z.nativeEnum(SectionLevel),
    type: z.nativeEnum(SectionType),
    requiredCreditHours: z
        .union([z.string(), z.number()])
        .transform((val) => Number(val)),
    name: z.string().nullable()
});