import {useSuspenseQuery} from "@tanstack/react-query";
import {getProgramListQuery} from "@/features/program/queries.ts";

export const useProgramList = () => {
    return useSuspenseQuery(getProgramListQuery);
};