import {api} from "@/shared/api.ts";
import {User} from "@/features/auth/types.ts";
import {z} from "zod";
import {LoginSchema} from "@/features/auth/schemas.ts";

const ENDPOINT = '/users';

export const loginUser = (user: z.infer<typeof LoginSchema>) =>
    api.post<string>([ENDPOINT, 'login'], {
        body: user
    });

export const getMe = () =>
    api.get<User>([ENDPOINT, 'me']);
