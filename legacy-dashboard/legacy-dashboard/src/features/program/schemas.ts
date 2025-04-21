import {z} from "zod";
import {Degree} from "@/features/program/types.ts";

export const programDetailsSchema = z.interface({
    code: z.string().transform(val => val.toLocaleUpperCase()),
    name: z.string(),
    degree: z.enum(Object.keys(Degree)),
    isPrivate: z.boolean().default(true)
});
