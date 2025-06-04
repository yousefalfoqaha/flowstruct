import {api} from "@/shared/api.ts";
import {User} from "@/features/user/types.ts";
import {z} from "zod";
import {LoginSchema} from "@/features/user/schemas.ts";

const ENDPOINT = '/users';

export const loginUser = (loginDetails: z.infer<typeof LoginSchema>) =>
    api.post([ENDPOINT, 'login'], {
        body: loginDetails
    });

export const getMe = () =>
    api.get<User>([ENDPOINT, 'me']);

export const logoutUser = () => api.post([ENDPOINT, 'logout']);
