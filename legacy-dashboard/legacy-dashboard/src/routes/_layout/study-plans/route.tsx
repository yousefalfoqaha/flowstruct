import {createFileRoute, Outlet} from '@tanstack/react-router'
import {Stack, Title} from "@mantine/core";

export const Route = createFileRoute('/_layout/study-plans')({
    loader: () => ({
        crumb: 'Study Plans',
    }),
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Stack>
            <Title order={2} fw={600}>Programs</Title>
            <Outlet/>
        </Stack>
    );
}