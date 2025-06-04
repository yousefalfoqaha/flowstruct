import { queryOptions } from '@tanstack/react-query';
import { getProgram, getProgramList } from '@/features/program/api.ts';

export const programKeys = {
  all: ['programs'] as const,
  list: () => [...programKeys.all, 'list'] as const,
  details: () => [...programKeys.all, 'detail'] as const,
  detail: (id: number) => [...programKeys.details(), id] as const,
};

export const ProgramListQuery = queryOptions({
  queryKey: programKeys.list(),
  queryFn: getProgramList,
});

export const ProgramQuery = (programId: number) =>
  queryOptions({
    queryKey: programKeys.detail(programId),
    queryFn: () => getProgram(programId),
  });
