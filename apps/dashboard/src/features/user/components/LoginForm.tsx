import {Button, Container, Paper, PasswordInput, Stack, TextInput, Title} from "@mantine/core";
import classes from "./LoginForm.module.css";
import {useAppForm} from "@/shared/hooks/useAppForm.ts";
import {LoginSchema} from "@/features/user/schemas.ts";
import {useLogin} from "@/features/user/hooks/useLogin.ts";
import {useNavigate} from "@tanstack/react-router";
import {getDefaultSearchValues} from "@/utils/getDefaultSearchValues.ts";
import {Controller} from "react-hook-form";
import {LogIn} from "lucide-react";

export function LoginForm() {
    const form = useAppForm(LoginSchema, {
        username: '',
        password: ''
    });
    const login = useLogin();
    const navigate = useNavigate();

    const onSubmit = form.handleSubmit(data => {
        login.mutate(
            data,
            {
                onSuccess: () => navigate({
                    to: '/',
                    search: getDefaultSearchValues()
                })
            }
        );
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
                            render={({field}) => (
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
                            render={({field}) => (
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

                    <Button leftSection={<LogIn size={18} />} loading={login.isPending} type="submit" fullWidth mt="xl">
                        Log In
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
