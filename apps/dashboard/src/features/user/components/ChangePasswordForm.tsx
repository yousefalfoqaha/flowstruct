import { Alert, Button, Fieldset, Group, List, PasswordInput, Stack } from '@mantine/core';
import { Info, Lock, Pencil, X } from 'lucide-react';
import { useChangePassword } from '@/features/user/hooks/useChangePassword.ts';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { changePasswordSchema } from '@/features/user/schemas.ts';
import { customResolver } from '@/utils/customResolver.ts';
import { modals } from '@mantine/modals';

export function ChangePasswordForm() {
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: customResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const changePassword = useChangePassword();

  const onSubmit = form.handleSubmit((data) => {
    changePassword.mutate(data, {
      onSuccess: () => {
        modals.closeAll();
      },
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <Alert color="blue" icon={<Info size={18} />} title="Password Requirements">
          <List>
            <List.Item>Be at least 8 characters long</List.Item>
            <List.Item>Contains at least one uppercase letter</List.Item>
            <List.Item>Contains at least one lowercase letter</List.Item>
            <List.Item>Contains at least one number</List.Item>
            <List.Item>Contains at least one special character (@ $ ! % * ? &)</List.Item>
          </List>
        </Alert>

        <Fieldset legend="Change Password Details">
          <Stack>
            <Controller
              name="currentPassword"
              control={form.control}
              render={({ field }) => (
                <PasswordInput
                  data-autofocus
                  label="Current Password"
                  {...field}
                  error={form.formState.errors.currentPassword?.message}
                  autoComplete="off"
                  withAsterisk
                  leftSection={<Lock size={18} />}
                />
              )}
            />

            <Controller
              name="newPassword"
              control={form.control}
              render={({ field }) => (
                <PasswordInput
                  label="New Password"
                  {...field}
                  error={form.formState.errors.newPassword?.message}
                  autoComplete="off"
                  withAsterisk
                  leftSection={<Lock size={18} />}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <PasswordInput
                  label="Confirm New Password"
                  {...field}
                  error={form.formState.errors.confirmPassword?.message}
                  autoComplete="off"
                  withAsterisk
                  leftSection={<Lock size={18} />}
                />
              )}
            />
          </Stack>
        </Fieldset>

        <Group justify="space-between">
          <Button onClick={() => modals.closeAll()} variant="default" leftSection={<X size={18} />}>
            Cancel
          </Button>

          <Button
            type="submit"
            loading={changePassword.isPending}
            leftSection={<Pencil size={18} />}
          >
            Save Changes
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
