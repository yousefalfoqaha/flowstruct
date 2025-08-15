import { ActionIcon, Menu, Text } from '@mantine/core';
import { Ellipsis, History, Pencil, RotateCcw, ScrollText, Trash } from 'lucide-react';
import { Program } from '@/features/program/types.ts';
import { modals } from '@mantine/modals';
import { useDeleteProgram } from '@/features/program/hooks/useDeleteProgram.ts';
import { useMarkProgramOutdated } from '@/features/program/hooks/useMarkProgramOutdated.ts';
import { useMarkProgramActive } from '@/features/program/hooks/useMarkProgramActive.ts';
import { Link } from '@tanstack/react-router';
import { useAuth } from '@/shared/hooks/useAuth.ts';

type ProgramOptionsMenuProps = {
  program: Program;
};

export function ProgramOptionsMenu({ program }: ProgramOptionsMenuProps) {
  const deleteProgram = useDeleteProgram();
  const markProgramOutdated = useMarkProgramOutdated();
  const markProgramActive = useMarkProgramActive();

  const { hasPermission } = useAuth();

  return (
    <Menu shadow="md">
      <Menu.Target>
        <ActionIcon loading={deleteProgram.isPending} variant="transparent" color="gray">
          <Ellipsis size={14} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Actions</Menu.Label>
        <Link
          style={{ textDecoration: 'none' }}
          to="/catalog/programs/$programId"
          params={{ programId: String(program.id) }}
        >
          <Menu.Item leftSection={<ScrollText size={14} />}>View</Menu.Item>
        </Link>
        <Link
          style={{ textDecoration: 'none' }}
          to="/catalog/programs/$programId/edit"
          params={{ programId: String(program.id) }}
        >
          <Menu.Item leftSection={<Pencil size={14} />}>Edit details</Menu.Item>
        </Link>

        <Menu.Divider />

        {program.outdatedAt ? (
          <Menu.Item
            color="green"
            leftSection={<RotateCcw size={14} />}
            onClick={() =>
              modals.openConfirmModal({
                title: 'Mark Program as Active',
                children: (
                  <Text size="sm">
                    Marking this program as active will indicate it's currently in use. Are you sure
                    you want to proceed?
                  </Text>
                ),
                labels: { confirm: 'Mark Active', cancel: 'Cancel' },
                onConfirm: () => markProgramActive.mutate(program.id),
              })
            }
          >
            Mark active
          </Menu.Item>
        ) : (
          <Menu.Item
            color="orange"
            leftSection={<History size={14} />}
            onClick={() =>
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
              })
            }
          >
            Mark outdated
          </Menu.Item>
        )}

        {hasPermission('programs:delete') && (
          <Menu.Item
            color="red"
            leftSection={<Trash size={14} />}
            onClick={() =>
              modals.openConfirmModal({
                title: 'Please confirm your action',
                children: (
                  <Text size="sm">
                    Deleting this program will delete all of its study plans. Are you absolutely
                    sure?
                  </Text>
                ),
                labels: { confirm: 'Confirm', cancel: 'Cancel' },
                onConfirm: () => deleteProgram.mutate(program.id),
              })
            }
          >
            Delete
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
