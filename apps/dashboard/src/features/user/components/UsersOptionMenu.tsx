import { ActionIcon, Menu } from '@mantine/core';
import { Ellipsis, Lock, Pencil, ScrollText, Shield, Trash } from 'lucide-react';
import { User } from '@/features/user/types.ts';

type Props = {
  user: User;
};

export function UsersOptionMenu({ user }: Props) {
  return (
    <Menu>
      <Menu.Target>
        <ActionIcon variant="transparent" color="gray">
          <Ellipsis size={14} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Actions</Menu.Label>

        <Menu.Item leftSection={<ScrollText size={14} />}>View</Menu.Item>

        <Menu.Item leftSection={<Pencil size={14} />}>Edit details</Menu.Item>

        <Menu.Divider />

        <Menu.Item leftSection={<Shield size={14} />}>Change role</Menu.Item>

        <Menu.Item leftSection={<Lock size={14} />}>Change password</Menu.Item>

        <Menu.Item color="red" leftSection={<Trash size={14} />}>
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
