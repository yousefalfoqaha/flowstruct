import {api} from "@/shared/api.ts";
import {LoginResponse, User} from "@/features/auth/types.ts";

export const loginUser = (user: User) =>
    api.post<LoginResponse>('/login', {
        body: user
    });