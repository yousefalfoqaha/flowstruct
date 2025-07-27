import { Button, Fieldset, Group, Stack } from '@mantine/core';
import { UserDetailsFields } from '@/features/user/components/UserDetailsFields.tsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { userDetailsSchema } from '@/features/user/schemas.ts';
import { User } from '@/features/user/types.ts';
import { customResolver } from '@/utils/customResolver.ts';
import { useEditUserDetails } from '@/features/user/hooks/useEditUserDetails.ts';
import { modals } from '@mantine/modals';
import { Pencil, X } from 'lucide-react';

type Props = {
  user: User;
};

export function EditUserFieldset({ user }: Props) {
  const form = useForm<z.infer<typeof userDetailsSchema>>({
    resolver: customResolver(userDetailsSchema),
    defaultValues: { ...user },
  });

  const editUser = useEditUserDetails();

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
        <Fieldset>
          <UserDetailsFields form={form} />
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
