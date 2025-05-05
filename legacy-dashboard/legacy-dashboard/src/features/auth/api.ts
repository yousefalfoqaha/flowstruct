import {api} from "@/shared/api.ts";
import {User} from "@/features/auth/types.ts";

export const loginUser = (user: Partial<User>) =>
    api.post<string>('/login', {
        body: user
    });

export const getUser = (id: number) =>
    api.get<User>(`/users/${id}`);
