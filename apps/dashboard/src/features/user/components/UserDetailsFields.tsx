import { Controller, UseFormReturn } from 'react-hook-form';
import { z } from 'zod/v4';
import { newUserSchema } from '@/features/user/schemas.ts';
import { Divider, Group, PasswordInput, Select, Stack, TextInput } from '@mantine/core';
import { Lock, Mail, Shield, User } from 'lucide-react';
import { Role } from '@/features/user/types.ts';
import { PasswordRequirements } from '@/features/user/components/PasswordRequirements.tsx';

type Props = {
  form: UseFormReturn<z.infer<typeof newUserSchema>>;
};

export function UserDetailsFields({ form }: Props) {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Stack>
      {/* Username + Email */}
      <Group grow align="start">
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Username"
              leftSection={<User size={18} />}
              {...field}
              error={errors.username?.message}
              autoComplete="off"
              withAsterisk
            />
          )}
        />
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select
              label="Role"
              leftSection={<Shield size={18} />}
              data={Object.entries(Role).map(([key, label]) => ({
                value: key,
                label,
              }))}
              {...field}
              error={errors.role?.message}
              withAsterisk
            />
          )}
        />
      </Group>

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Email"
            leftSection={<Mail size={18} />}
            {...field}
            error={errors.email?.message}
            autoComplete="off"
            withAsterisk
          />
        )}
      />

      <Divider />

      <PasswordRequirements />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <PasswordInput
            label="Password"
            leftSection={<Lock size={18} />}
            {...field}
            error={errors.password?.message}
            autoComplete="new-password"
            withAsterisk
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <PasswordInput
            label="Confirm Password"
            placeholder="Enter password again"
            leftSection={<Lock size={18} />}
            {...field}
            error={errors.confirmPassword?.message}
            autoComplete="off"
            withAsterisk
          />
        )}
      />
    </Stack>
  );
}
