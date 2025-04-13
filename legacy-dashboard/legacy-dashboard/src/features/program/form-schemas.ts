import {z} from "zod";
import {Degree} from "@/features/program/types.ts";

export const programDetailsSchema = z.object({
    code: z.string().transform(val => val.toLocaleUpperCase()),
    name: z.string(),
    degree: z.enum(
        Object.keys(Degree) as [string, ...string[]],
        {errorMap: () => ({message: "Degree is required"})}
    ),
    isPrivate: z.boolean().default(true)
});

export type ProgramDetailsFormValues = z.infer<typeof programDetailsSchema>;
