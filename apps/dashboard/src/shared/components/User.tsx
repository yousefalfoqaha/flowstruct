import { ActionIcon, Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import classes from '@/shared/components/AppLayout.module.css';
import { LogOut } from 'lucide-react';
import { useMe } from '@/features/user/hooks/useMe.ts';
import { useLogout } from '@/features/user/hooks/useLogout.ts';

export function User() {
  const { data: me } = useMe();
  const logout = useLogout();

  return (
    <Group>
      <UnstyledButton className={classes.user}>
        <Group>
          <Avatar size={32} radius="xl" />
          <div>
            <Text size="md">{me.username}</Text>
            <Text c="dimmed" size="xs">
              Administrator
            </Text>
          </div>
        </Group>
      </UnstyledButton>
      <ActionIcon variant="subtle" onClick={() => logout.mutate()}>
        <LogOut size={16} />
      </ActionIcon>
    </Group>
  );
}
