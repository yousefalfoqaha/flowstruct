import {createFileRoute} from '@tanstack/react-router'
import {Group, Stack, Title} from "@mantine/core";
import {Logs} from "lucide-react";

export const Route = createFileRoute('/_layout/activity-logs/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Stack>
            <Group>
                <Logs/>
                <Title order={2} fw={600}>Activity Logs</Title>
            </Group>
        </Stack>
    );
}
