import { Avatar, Button, Group, Menu, Stack, Text, UnstyledButton } from '@mantine/core';
import classes from '@/shared/components/AppLayout.module.css';
import { useMe } from '@/features/user/hooks/useMe.ts';
import { useLogout } from '@/features/user/hooks/useLogout.ts';
import React from 'react';
import cx from 'clsx';
import { ChevronDown, Lock, LogOut, Pencil, ScrollText, X } from 'lucide-react';
import { modals } from '@mantine/modals';
import { ModalHeader } from '@/shared/components/ModalHeader.tsx';
import { UserDetailsDisplay } from '@/features/user/components/UserDetailsDisplay.tsx';
import { EditUserFieldset } from '@/features/user/components/EditUserFieldset.tsx';
import { ChangePasswordFieldset } from '@/features/course/components/ChangePasswordFieldset.tsx';

export function User() {
  const { data: me } = useMe();
  const logout = useLogout();
  const [userMenuOpened, setUserMenuOpened] = React.useState(false);

  const openEditUserDetails = () =>
    modals.open({
      title: <ModalHeader subtitle="Edit your account's details" title="Edit User Details" />,
      children: <EditUserFieldset user={me} />,
      centered: true,
    });

  return (
    <Group>
      <Menu
        width={200}
        shadow="sm"
        position="bottom-end"
        transitionProps={{ transition: 'pop-top-right' }}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
            <Group>
              <Avatar size={32} radius="xl" />

              <div>
                <Text>{me.username}</Text>

                <Text c="dimmed" size="xs">
                  Administrator
                </Text>
              </div>

              <ChevronDown
                color="gray"
                size={14}
                style={{
                  transform: `rotate(${userMenuOpened ? '180' : '0'}deg)`,
                  transition: 'transform 150ms ease-in-out',
                }}
              />
            </Group>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Actions</Menu.Label>

          <Menu.Item
            onClick={() =>
              modals.open({
                title: <ModalHeader subtitle="Details about your account" title="User Details" />,
                children: (
                  <Stack>
                    <UserDetailsDisplay />
                    <Group justify="space-between">
                      <Button
                        variant="default"
                        leftSection={<X size={18} />}
                        onClick={() => modals.closeAll()}
                      >
                        Close
                      </Button>

                      <Button
                        variant="outline"
                        leftSection={<Pencil size={18} />}
                        onClick={openEditUserDetails}
                      >
                        Edit Details
                      </Button>
                    </Group>
                  </Stack>
                ),
                centered: true,
              })
            }
            leftSection={<ScrollText size={14} />}
          >
            View
          </Menu.Item>

          <Menu.Item onClick={openEditUserDetails} leftSection={<Pencil size={14} />}>
            Edit details
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            leftSection={<Lock size={14} />}
            onClick={() =>
              modals.open({
                title: (
                  <ModalHeader
                    subtitle="Enter your current password, then enter the new password and confirm it"
                    title="Change Password"
                  />
                ),
                children: <ChangePasswordFieldset />,
                centered: true,
                size: 'lg',
              })
            }
          >
            Change password
          </Menu.Item>

          <Menu.Item
            onClick={() => logout.mutate()}
            leftSection={<LogOut style={{ color: 'var(--mantine-primary-color-8)' }} size={14} />}
          >
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
