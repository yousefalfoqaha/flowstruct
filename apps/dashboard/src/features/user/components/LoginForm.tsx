import { Button, Container, Paper, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import classes from './LoginForm.module.css';
import { LoginSchema } from '@/features/user/schemas.ts';
import { useLogin } from '@/features/user/hooks/useLogin.ts';
import { useNavigate } from '@tanstack/react-router';
import { DefaultSearchValues } from '@/utils/defaultSearchValues.ts';
import { Controller, useForm } from 'react-hook-form';
import { LogIn } from 'lucide-react';
import { z } from 'zod/v4';
import { customResolver } from '@/utils/customResolver.ts';

export function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: customResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const login = useLogin();
  const navigate = useNavigate();

  const onSubmit = form.handleSubmit((data) => {
    login.mutate(data, {
      onSuccess: () =>
        navigate({
          to: '/',
          search: DefaultSearchValues(),
        }),
    });
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        GJUPlans Admin
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30}>
        <form onSubmit={onSubmit}>
          <Stack>
            <Controller
              name="username"
              control={form.control}
              render={({ field }) => (
                <TextInput
                  label="Username"
                  placeholder="Your username"
                  {...field}
                  error={form.formState.errors.username?.message}
                  autoComplete="off"
                  withAsterisk
                />
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field }) => (
                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  {...field}
                  error={form.formState.errors.password?.message}
                  autoComplete="off"
                  withAsterisk
                />
              )}
            />
          </Stack>

          <Button
            leftSection={<LogIn size={18} />}
            loading={login.isPending}
            type="submit"
            fullWidth
            mt="xl"
          >
            Log In
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
