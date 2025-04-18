import {createFileRoute} from '@tanstack/react-router';
import {Stack, Title} from '@mantine/core';

export const Route = createFileRoute(
    '/old-study-plans/_studyPlanLayout/',
)({
    loader: () => ({
        crumb: 'Overview'
    }),
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Stack>
            <Title fw={600}>Overview</Title>
        </Stack>
    );
}
