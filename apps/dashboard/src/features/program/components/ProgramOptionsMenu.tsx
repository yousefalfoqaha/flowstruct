import { ActionIcon, Menu, Text } from '@mantine/core';
import { Ellipsis, Pencil, ScrollText, Trash } from 'lucide-react';
import { Program } from '@/features/program/types.ts';
import { modals } from '@mantine/modals';
import { useDeleteProgram } from '@/features/program/hooks/useDeleteProgram.ts';
import { Link } from '@tanstack/react-router';

type ProgramOptionsMenuProps = {
  program: Program;
};

export function ProgramOptionsMenu({ program }: ProgramOptionsMenuProps) {
  const deleteProgram = useDeleteProgram();

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
          to="/programs/$programId"
          params={{ programId: String(program.id) }}
        >
          <Menu.Item leftSection={<ScrollText size={14} />}>View</Menu.Item>
        </Link>
        <Link
          style={{ textDecoration: 'none' }}
          to="/programs/$programId/edit"
          params={{ programId: String(program.id) }}
        >
          <Menu.Item leftSection={<Pencil size={14} />}>Edit details</Menu.Item>
        </Link>

        <Menu.Divider />

        <Menu.Item
          color="red"
          leftSection={<Trash size={14} />}
          onClick={() =>
            modals.openConfirmModal({
              title: 'Please confirm your action',
              children: (
                <Text size="sm">
                  Deleting this program will delete all of its study plans. Are you absolutely sure?
                </Text>
              ),
              labels: { confirm: 'Confirm', cancel: 'Cancel' },
              onConfirm: () => deleteProgram.mutate(program.id),
            })
          }
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
