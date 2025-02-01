import {z} from "zod";

export const programFormSchema = z.object({
    id: z.number(),
    code: z.string().toUpperCase().min(1, {message: 'Code cannot be empty.'}),
    name: z.string().min(1, {message: 'Name cannot be empty.'}),
    degree: z.string()
});

export const createProgramFormSchema = z.object({
    code: z.string().toUpperCase().min(1, {message: 'Code cannot be empty.'}),
    name: z.string().min(1, {message: 'Name cannot be empty.'}),
    degree: z.string().min(1, {message: 'Must pick a degree.'})
});