import {createFileRoute} from '@tanstack/react-router';
import {Stack, Title} from "@mantine/core";

export const Route = createFileRoute('/study-plans/$studyPlanId/overview')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Stack>
            <Title fw={600}>Overview</Title>
        </Stack>
    );
}
