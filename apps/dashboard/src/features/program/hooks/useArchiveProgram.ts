import { PROGRAM_ENDPOINT } from '@/features/program/constants.ts';
import { programKeys } from '@/features/program/queries.ts';
import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';
import { api } from '@/shared/api.ts';

const archiveProgram = (programId: number) =>
  api.put<void>([PROGRAM_ENDPOINT, programId, 'archive']);

export const useArchiveProgram = () =>
  useAppMutation({
    mutationFn: archiveProgram,
    meta: {
      invalidates: (_, programId) => [programKeys.list(), programKeys.detail(programId)],
      successMessage: 'Program archived.',
    },
  });
