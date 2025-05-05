import {queryOptions} from "@tanstack/react-query";
import {getUser} from "@/features/auth/api.ts";

export const userKeys = {
    all: ['users'] as const,
    details: () => [...userKeys.all, 'detail'] as const,
    detail: (id: number) => [...userKeys.details(), id] as const
}

export const UserQuery = (id: number) => queryOptions({
    queryKey: userKeys.detail(id),
    queryFn: () => getUser(id)
});
