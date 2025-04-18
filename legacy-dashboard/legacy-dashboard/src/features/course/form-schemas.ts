import {z} from "zod";
import {CourseType} from "@/features/course/types.ts";

export const searchCourseFormSchema = z.object({
    code: z.string().optional(),
    name: z.string().optional(),
}).refine(data => data.code || data.name, {
    error: "At least one field must be filled"
});

export const courseDetailsSchema = z.object({
    code: z.string().transform(val => val.toLocaleUpperCase()),
    name: z.string(),
    creditHours: z.number().min(0, {error: "Must be positive"}),
    ects: z.number()
        .min(0, {error: "Must be positive"})
        .optional()
        .transform(val => val ?? 0),
    lectureHours: z.number().min(0, {error: "Must be positive"}),
    practicalHours: z.number().min(0, {error: "Must be positive"}),
    type: z.enum(CourseType),
    isRemedial: z.boolean().default(false)
});

export type CourseDetailsFormValues = z.infer<typeof courseDetailsSchema>;