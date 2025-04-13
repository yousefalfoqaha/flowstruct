import {queryOptions} from "@tanstack/react-query";
import {getProgramListRequest, getProgramRequest} from "@/features/program/api.ts";

export const programKeys = {
    all: ['programs'] as const,
    lists: () => [...programKeys.all, 'list'] as const,
    list: (page: number) => [...programKeys.lists(), page] as const,
    details: () => [...programKeys.all, 'detail'] as const,
    detail: (id: number) => [...programKeys.details(), id] as const,
};

export const getProgramListQuery = queryOptions({
    queryKey: programKeys.all,
    queryFn: getProgramListRequest
});

export const getProgramQuery = (programId: number) => queryOptions({
    queryKey: programKeys.detail(programId),
    queryFn: () => getProgramRequest(programId)
});
