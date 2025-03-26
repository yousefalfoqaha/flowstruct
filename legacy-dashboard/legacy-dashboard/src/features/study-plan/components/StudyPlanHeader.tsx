import {ActionIcon, Avatar, Badge, Flex, Group, Title} from "@mantine/core";
import {StudyPlanBreadcrumbs} from "@/features/study-plan/components/StudyPlanBreadcrumbs.tsx";
import {LogOut} from "lucide-react";

export function StudyPlanHeader({title}: { title: string }) {
    return (
        <Flex direction="column" gap="lg">
            <Group justify="space-between">
                <StudyPlanBreadcrumbs/>

                <Group gap="lg">
                    <Group gap="sm">
                        <Badge variant="dot">Last update: 3 weeks ago</Badge>
                    </Group>

                    <Avatar color="blue" variant="transparent" radius="xl"/>

                    <ActionIcon size="sm" variant="transparent">
                        <LogOut/>
                    </ActionIcon>
                </Group>
            </Group>

            <Group justify="space-between">
                <Title fw={600}>{title}</Title>
            </Group>
        </Flex>
    );
}