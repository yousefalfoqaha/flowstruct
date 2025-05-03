import {Button, Container, Paper, PasswordInput, TextInput, Title} from "@mantine/core";
import classes from "./LoginForm.module.css";

export function LoginForm() {
    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                GJUPlans Dashboard
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Username" placeholder="Your username" required/>
                <PasswordInput label="Password" placeholder="Your password" required mt="md"/>
                <Button fullWidth mt="xl">
                    Sign in
                </Button>
            </Paper>
        </Container>
    );
}
