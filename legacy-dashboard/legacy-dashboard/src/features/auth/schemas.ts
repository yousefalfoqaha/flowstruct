import {z} from "zod";

export const UserSchema = z.interface({
    username: z.string().min(1),
    password: z.string().min(1)
});