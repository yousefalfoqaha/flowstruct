import { Menu, Text } from '@mantine/core';
import { History, RotateCcw, Trash } from 'lucide-react';
import { Program } from '@/features/program/types.ts';
import { modals } from '@mantine/modals';
import { useDeleteProgram } from '@/features/program/hooks/useDeleteProgram.ts';
import { useMarkProgramOutdated } from '@/features/program/hooks/useMarkProgramOutdated.ts';
import { useMarkProgramActive } from '@/features/program/hooks/useMarkProgramActive.ts';
import { useAuth } from '@/shared/hooks/useAuth.ts';

type Props = {
  program: Program;
  onDeleteSuccess?: () => void;
};

export function ProgramDangerousOptionsMenuItems({ program, onDeleteSuccess }: Props) {
  const deleteProgram = useDeleteProgram();
  const markProgramOutdated = useMarkProgramOutdated();
  const markProgramActive = useMarkProgramActive();

  const { hasPermission } = useAuth();

  const handleMarkOutdated = () =>
    modals.openConfirmModal({
      title: 'Mark Program as Outdated',
      children: (
        <Text size="sm">
          Marking this program as outdated will indicate it's no longer in use. Are you sure you
          want to proceed?
        </Text>
      ),
      labels: { confirm: 'Mark Outdated', cancel: 'Cancel' },
      onConfirm: () => markProgramOutdated.mutate(program.id),
    });

  const handleMarkActive = () =>
    modals.openConfirmModal({
      title: 'Mark Program as Active',
      children: (
        <Text size="sm">
          Marking this program as active will indicate it's currently in use. Are you sure you want
          to proceed?
        </Text>
      ),
      labels: { confirm: 'Mark Active', cancel: 'Cancel' },
      onConfirm: () => markProgramActive.mutate(program.id),
    });

  const handleDeleteProgram = () =>
    modals.openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          Deleting this program will delete all of its study plans. Are you absolutely sure?
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () =>
        deleteProgram.mutate(program.id, {
          onSuccess: () => {
            if (onDeleteSuccess) {
              onDeleteSuccess();
            }
          },
        }),
    });

  return (
    <>
      {program.outdatedAt ? (
        <Menu.Item color="green" leftSection={<RotateCcw size={14} />} onClick={handleMarkActive}>
          Mark as Active
        </Menu.Item>
      ) : (
        <Menu.Item color="orange" leftSection={<History size={14} />} onClick={handleMarkOutdated}>
          Mark as Outdated
        </Menu.Item>
      )}

      {hasPermission('programs:delete') && (
        <Menu.Item color="red" leftSection={<Trash size={14} />} onClick={handleDeleteProgram}>
          Delete
        </Menu.Item>
      )}
    </>
  );
}
