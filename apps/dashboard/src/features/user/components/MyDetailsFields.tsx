import { Controller, UseFormReturn } from 'react-hook-form';
import { z } from 'zod/v4';
import { userSchema } from '@/features/user/schemas.ts';
import { Stack, TextInput } from '@mantine/core';
import { Mail, User } from 'lucide-react';

type Props = {
  form: UseFormReturn<z.infer<typeof userSchema>>;
};

export function MyDetailsFields({ form }: Props) {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Stack>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextInput
            data-autofocus
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
        name="email"
        control={control}
        render={({ field }) => (
          <TextInput
            data-autofocus
            label="Email"
            leftSection={<Mail size={18} />}
            {...field}
            error={errors.email?.message}
            autoComplete="off"
            withAsterisk
          />
        )}
      />
    </Stack>
  );
}
