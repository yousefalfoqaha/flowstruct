import {z} from "zod";
import {SectionLevel, SectionType} from "@/features/study-plan/types.ts";

export const studyPlanDetailsSchema = z.interface({
    program: z
        .string(),
    year: z
        .string(),
    duration: z
        .number()
        .min(1, {error: "Must be at least 1 year"})
        .default(4),
    track: z.string(),
    isPrivate: z
        .boolean()
        .default(true)
});

export const sectionDetailsSchema = z.interface({
    level: z.enum(SectionLevel),
    type: z.enum(SectionType),
    requiredCreditHours: z.number().nonnegative({error: "Must be positive"}),
    name: z.string()
});
