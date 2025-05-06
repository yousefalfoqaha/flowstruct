import {useSuspenseQuery} from "@tanstack/react-query";
import {MeQuery} from "@/features/auth/queries.ts";

export const useMe = () => {
    return useSuspenseQuery(MeQuery);
}
