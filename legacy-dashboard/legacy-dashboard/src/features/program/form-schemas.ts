import {z} from "zod";
import {Degree} from "@/features/program/types.ts";

export const programDetailsSchema = z.object({
    name: z.string().min(1, "Name is required"),
    code: z.string().min(1, "Code is required"),
    degree: z.enum(
        Object.keys(Degree) as [string, ...string[]],
        {errorMap: () => ({message: "Degree is required"})}
    ),
});

export type ProgramDetailsFormValues = z.infer<typeof programDetailsSchema>;
