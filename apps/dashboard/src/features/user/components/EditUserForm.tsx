import { Button, Fieldset, Group, Stack } from '@mantine/core';
import { UserFields } from '@/features/user/components/UserFields.tsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { userSchema } from '@/features/user/schemas.ts';
import { User } from '@/features/user/types.ts';
import { customResolver } from '@/utils/customResolver.ts';
import { useEditMyDetails } from '@/features/user/hooks/useEditMyDetails.ts';
import { modals } from '@mantine/modals';
import { Pencil, X } from 'lucide-react';
import { useMe } from '@/features/user/hooks/useMe.ts';
import { useEditUserDetails } from '@/features/user/hooks/useEditUserDetails.ts';

type Props = {
  user: User;
};

export function EditUserForm({ user }: Props) {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: customResolver(userSchema),
    defaultValues: { ...user },
  });
  const { data: me } = useMe();
  const editMe = useEditMyDetails();
  const editUser = useEditUserDetails();

  const onSubmit = form.handleSubmit((data) => {
    if (user.id === me.id) {
      editMe.mutate(
        {
          details: data,
        },
        {
          onSuccess: () => {
            modals.closeAll();
          },
        }
      );

      return;
    }

    editUser.mutate(
      {
        userId: user.id,
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
        <Fieldset variant="filled">
          <UserFields form={form} />
        </Fieldset>

        <Group justify="space-between">
          <Button variant="default" leftSection={<X size={18} />} onClick={() => modals.closeAll()}>
            Cancel
          </Button>

          <Button
            type="submit"
            leftSection={<Pencil size={18} />}
            loading={editUser.isPending}
            disabled={!form.formState.isValid || !form.formState.isDirty}
          >
            Save Changes
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
