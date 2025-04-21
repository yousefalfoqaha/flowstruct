import {z} from "zod";
import {SectionLevel, SectionType} from "@/features/study-plan/types.ts";

export const studyPlanDetailsSchema = z.interface({
    program: z.string(),
    year: z
        .date()
        .default(new Date()),
    duration: z
        .number()
        .min(1, {error: "Must be at least 1 year"})
        .default(4),
    track: z
        .string()
        .trim()
        .transform(val => val === '' ? undefined : val)
        .optional(),
    isPrivate: z
        .boolean()
        .default(true)
});

export const sectionDetailsSchema = z.interface({
    level: z.enum(SectionLevel),
    type: z.enum(SectionType),
    requiredCreditHours: z.number().nonnegative({error: "Must be positive"}),
    name: z
        .string()
        .trim()
        .transform((val) => (val === "" ? null : val))
        .nullable()
        .optional()
});

export type SectionDetailsFormValues = z.infer<typeof sectionDetailsSchema>;