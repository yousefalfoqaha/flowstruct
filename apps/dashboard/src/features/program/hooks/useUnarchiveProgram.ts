import { PROGRAM_ENDPOINT } from '@/features/program/constants.ts';
import { programKeys } from '@/features/program/queries.ts';
import { useAppMutation } from '@/shared/hooks/useAppMutation.ts';
import { api } from '@/shared/api.ts';

const unarchiveProgram = (programId: number) =>
  api.put<void>([PROGRAM_ENDPOINT, programId, 'unarchive']);

export const useUnarchiveProgram = () =>
  useAppMutation({
    mutationFn: unarchiveProgram,
    meta: {
      invalidates: (_, programId) => [programKeys.list(), programKeys.detail(programId)],
      successMessage: 'Program unarchived.',
    },
  });
