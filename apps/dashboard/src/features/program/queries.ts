import { queryOptions } from '@tanstack/react-query';
import { PROGRAM_ENDPOINT } from '@/features/program/constants.ts';
import { api } from '@/shared/api.ts';
import { Program } from '@/features/program/types.ts';

export const programKeys = {
  all: ['programs'] as const,
  lists: () => [...programKeys.all, 'list'] as const,
  list: (options?: { archived: boolean }) => [...programKeys.lists(), options] as const,
  details: () => [...programKeys.all, 'detail'] as const,
  detail: (id: number) => [...programKeys.details(), id] as const,
};

export const ProgramListQuery = (options?: { archived: boolean }) =>
  queryOptions({
    queryKey: programKeys.list(options),
    queryFn: () =>
      api.get<Program[]>(PROGRAM_ENDPOINT, {
        params: options,
      }),
  });

export const ProgramQuery = (programId: number) =>
  queryOptions({
    queryKey: programKeys.detail(programId),
    queryFn: () => api.get<Program>([PROGRAM_ENDPOINT, programId.toString()]),
  });
