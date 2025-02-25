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

export const sectionDetailsSchema = z.object({
    level: z.nativeEnum(SectionLevel),
    type: z.nativeEnum(SectionType),
    requiredCreditHours: z.number().nonnegative({message: "Must be positive"}),
    name: z
        .string()
        .trim()
        .transform((val) => (val === "" ? null : val))
        .nullable()
        .optional()
});

export type SectionDetailsFormValues = z.infer<typeof sectionDetailsSchema>;