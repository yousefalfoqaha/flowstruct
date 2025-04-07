import {queryOptions} from "@tanstack/react-query";
import {getProgramListRequest, getProgramRequest} from "@/features/program/api.ts";

export const getProgramListQuery = queryOptions({
    queryKey: ["programs"],
    queryFn: getProgramListRequest
});

export const getProgramQuery = (programId: number) => queryOptions({
    queryKey: ["programs", "detail", programId],
    queryFn: () => getProgramRequest(programId)
});
