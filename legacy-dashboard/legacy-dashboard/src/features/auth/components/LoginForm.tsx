import {Button, Container, Paper, PasswordInput, TextInput, Title} from "@mantine/core";
import classes from "./LoginForm.module.css";
import {useAppForm} from "@/shared/hooks/useAppForm.ts";
import {UserSchema} from "@/features/auth/schemas.ts";

export function LoginForm() {
    const form = useAppForm(UserSchema);
    const {login} = useAuth;

    const onSubmit = form.handleSubmit(data => {
        console.log(data);
    });

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                GJUPlans Dashboard
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={onSubmit}>
                    <TextInput label="Username" placeholder="Your username" required/>

                    <PasswordInput label="Password" placeholder="Your password" required mt="md"/>

                    <Button fullWidth mt="xl">
                        Sign in
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
