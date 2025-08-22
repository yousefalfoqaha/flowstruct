import {queryOptions} from "@tanstack/react-query";
import {getMe} from "@/features/user/api.ts";

export const userKeys = {
    all: ['users'] as const,
    me: () => [...userKeys.all, 'me'] as const,
}

export const MeQuery = queryOptions({
    queryKey: userKeys.me(),
    queryFn: () => getMe()
});
