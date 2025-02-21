import {useSuspenseQuery} from "@tanstack/react-query";
import {getProgramQuery} from "@/features/program/queries.ts";

export const useProgram = (programId: number) => {
    return useSuspenseQuery(getProgramQuery(programId));
}