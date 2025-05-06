import {Button, Container, Paper, PasswordInput, Stack, TextInput, Title} from "@mantine/core";
import classes from "./LoginForm.module.css";
import {useAppForm} from "@/shared/hooks/useAppForm.ts";
import {LoginSchema} from "@/features/auth/schemas.ts";
import {useLoginUser} from "@/features/auth/hooks/useLoginUser.ts";
import {useNavigate} from "@tanstack/react-router";
import {getDefaultSearchValues} from "@/utils/getDefaultSearchValues.ts";
import {Controller} from "react-hook-form";

export function LoginForm() {
    const form = useAppForm(LoginSchema);
    const login = useLoginUser();
    const navigate = useNavigate();

    const onSubmit = form.handleSubmit(data => {
        login.mutate(
            data,
            {
                onSuccess: () => navigate({
                    to: '/programs',
                    search: getDefaultSearchValues()
                })
            }
        );
    });

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                GJUPlans Dashboard
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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

                    <Button type="submit" fullWidth mt="xl">
                        Sign in
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
