import { Button, Fieldset, Group, Stack } from '@mantine/core';
import { MyDetailsFields } from '@/features/user/components/MyDetailsFields.tsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { userSchema } from '@/features/user/schemas.ts';
import { User } from '@/features/user/types.ts';
import { customResolver } from '@/utils/customResolver.ts';
import { useEditMyDetails } from '@/features/user/hooks/useEditMyDetails.ts';
import { modals } from '@mantine/modals';
import { Pencil, X } from 'lucide-react';

type Props = {
  user: User;
};

export function EditUserForm({ user }: Props) {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: customResolver(userSchema),
    defaultValues: { ...user },
  });

  const editUser = useEditMyDetails();

  const onSubmit = form.handleSubmit((data) => {
    editUser.mutate(
      {
        details: data,
      },
      {
        onSuccess: () => {
          modals.closeAll();
        },
      }
    );
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <Fieldset legend="Your Details">
          <MyDetailsFields form={form} />
        </Fieldset>

        <Group justify="space-between">
          <Button variant="default" leftSection={<X size={18} />} onClick={() => modals.closeAll()}>
            Cancel
          </Button>

          <Button type="submit" leftSection={<Pencil size={18} />} loading={editUser.isPending}>
            Save Changes
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
