import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { newUserSchema } from '@/features/user/schemas.ts';
import { customResolver } from '@/utils/customResolver.ts';
import { useCreateUser } from '@/features/user/hooks/useCreateUser.ts';
import { Link, useNavigate } from '@tanstack/react-router';
import { DefaultSearchValues } from '@/utils/defaultSearchValues.ts';
import { AppCard } from '@/shared/components/AppCard.tsx';
import { UserDetailsFields } from '@/features/user/components/UserDetailsFields.tsx';
import { Button } from '@mantine/core';
import { Plus, X } from 'lucide-react';

export function CreateUserFieldset() {
  const form = useForm<z.infer<typeof newUserSchema>>({
    resolver: customResolver(newUserSchema),
    defaultValues: {
      username: '',
      email: '',
      role: 'GUEST',
      password: '',
      confirmPassword: '',
    },
  });

  const createUser = useCreateUser();
  const navigate = useNavigate();

  const onSubmit = form.handleSubmit((data) => {
    createUser.mutate(data, {
      onSuccess: () => {
        navigate({ to: '/users', search: DefaultSearchValues() });
      },
    });
  });

  const footer = (
    <>
      <Link search={DefaultSearchValues()} to="/users">
        <Button variant="default" leftSection={<X size={18} />}>
          Cancel
        </Button>
      </Link>

      <Button
        disabled={!form.formState.isValid}
        type="submit"
        leftSection={<Plus size={18} />}
        loading={createUser.isPending}
      >
        Save User
      </Button>
    </>
  );

  return (
    <form onSubmit={onSubmit}>
      <AppCard
        title="User Details"
        subtitle="Enter the details for the new user here"
        footer={footer}
      >
        <UserDetailsFields form={form} />
      </AppCard>
    </form>
  );
}
