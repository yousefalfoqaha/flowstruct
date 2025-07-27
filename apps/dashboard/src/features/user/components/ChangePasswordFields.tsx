import { Controller, UseFormReturn } from 'react-hook-form';
import { z } from 'zod/v4';
import { changePasswordSchema } from '@/features/user/schemas.ts';
import { PasswordInput, Stack } from '@mantine/core';
import { Lock } from 'lucide-react';

type Props = {
  form: UseFormReturn<z.infer<typeof changePasswordSchema>>;
};

export function ChangePasswordFields({ form }: Props) {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Stack>
      <Controller
        name="currentPassword"
        control={control}
        render={({ field }) => (
          <PasswordInput
            data-autofocus
            label="Current Password"
            {...field}
            error={errors.currentPassword?.message}
            autoComplete="off"
            withAsterisk
            leftSection={<Lock size={18} />}
          />
        )}
      />

      <Controller
        name="newPassword"
        control={control}
        render={({ field }) => (
          <PasswordInput
            label="New Password"
            {...field}
            error={errors.newPassword?.message}
            autoComplete="off"
            withAsterisk
            leftSection={<Lock size={18} />}
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <PasswordInput
            label="Confirm New Password"
            {...field}
            error={errors.confirmPassword?.message}
            autoComplete="off"
            withAsterisk
            leftSection={<Lock size={18} />}
          />
        )}
      />
    </Stack>
  );
}
