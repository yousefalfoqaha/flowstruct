import { ActionIcon, Menu, Text } from '@mantine/core';
import { Ellipsis, Pencil, ScrollText, Trash, Archive, ArchiveRestore } from 'lucide-react';
import { Program } from '@/features/program/types.ts';
import { modals } from '@mantine/modals';
import { useDeleteProgram } from '@/features/program/hooks/useDeleteProgram.ts';
import { useArchiveProgram } from '@/features/program/hooks/useArchiveProgram.ts';
import { useUnarchiveProgram } from '@/features/program/hooks/useUnarchiveProgram.ts';
import { Link } from '@tanstack/react-router';

type ProgramOptionsMenuProps = {
  program: Program;
};

export function ProgramOptionsMenu({ program }: ProgramOptionsMenuProps) {
  const deleteProgram = useDeleteProgram();
  const archiveProgram = useArchiveProgram();
  const unarchiveProgram = useUnarchiveProgram();

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

        {program.deletedAt === null ? (
          <Menu.Item
            color="orange"
            leftSection={<Archive size={14} />}
            onClick={() =>
              modals.openConfirmModal({
                title: 'Archive program',
                children: (
                  <Text size="sm">
                    Archiving this program will make it unavailable to students. Are you sure you want to proceed?
                  </Text>
                ),
                labels: { confirm: 'Archive', cancel: 'Cancel' },
                onConfirm: () => archiveProgram.mutate(program.id),
              })
            }
          >
            Archive
          </Menu.Item>
        ) : (
          <Menu.Item
            color="green"
            leftSection={<ArchiveRestore size={14} />}
            onClick={() =>
              modals.openConfirmModal({
                title: 'Unarchive program',
                children: (
                  <Text size="sm">
                    Unarchiving this program will make it available again to students. Are you sure you want to proceed?
                  </Text>
                ),
                labels: { confirm: 'Unarchive', cancel: 'Cancel' },
                onConfirm: () => unarchiveProgram.mutate(program.id),
              })
            }
          >
            Unarchive
          </Menu.Item>
        )}

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
