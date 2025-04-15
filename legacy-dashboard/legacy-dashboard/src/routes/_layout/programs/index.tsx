import {createFileRoute} from '@tanstack/react-router'
import {Group, Stack, Title} from "@mantine/core";
import {ProgramsTable} from "@/features/program/components/ProgramsTable.tsx";
import {GraduationCap} from "lucide-react";

export const Route = createFileRoute('/_layout/programs/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Stack>
            <Group>
                <GraduationCap/>
                <Title order={2} fw={600}>Programs</Title>
            </Group>
            <ProgramsTable/>
        </Stack>
    );
}
