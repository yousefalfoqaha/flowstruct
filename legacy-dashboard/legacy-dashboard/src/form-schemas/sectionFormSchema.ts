import {z} from "zod";
import {SectionLevel, SectionType} from "@/types";

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