import {queryOptions} from "@tanstack/react-query";
import {getMe} from "@/features/auth/api.ts";

export const userKeys = {
    all: ['users'] as const,
    me: () => [...userKeys.all, 'me'] as const,
    details: () => [...userKeys.all, 'detail'] as const,
    detail: (id: number) => [...userKeys.details(), id] as const
}

export const MeQuery = queryOptions({
    queryKey: userKeys.me(),
    queryFn: () => getMe()
});
