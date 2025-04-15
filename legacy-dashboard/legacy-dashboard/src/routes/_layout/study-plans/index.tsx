import {createFileRoute} from '@tanstack/react-router'
import {Group, Stack, Title} from "@mantine/core";
import {StudyPlansTable} from "@/features/study-plan/components/StudyPlansTable.tsx";
import {ScrollText} from "lucide-react";

export const Route = createFileRoute('/_layout/study-plans/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Stack>
            <Group>
                <ScrollText />
                <Title order={2} fw={600}>Study Plans</Title>
            </Group>
            <StudyPlansTable/>
        </Stack>
    );
}
