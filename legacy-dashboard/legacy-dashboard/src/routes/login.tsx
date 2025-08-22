import {createFileRoute} from '@tanstack/react-router'
import {LoginForm} from "@/features/user/components/LoginForm.tsx";

export const Route = createFileRoute('/login')({
    component: RouteComponent,
});

export function RouteComponent() {
    return <LoginForm/>;
}
