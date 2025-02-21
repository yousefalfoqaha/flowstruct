import {useQuery} from "@tanstack/react-query";
import {getProgramListQuery} from "@/features/program/queries.ts";

export const useProgramList = () => {
    return useQuery(getProgramListQuery);
};