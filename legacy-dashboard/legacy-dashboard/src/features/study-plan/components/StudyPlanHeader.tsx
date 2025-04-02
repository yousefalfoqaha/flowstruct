import {ActionIcon, Avatar, Badge, Flex, Group, Title} from "@mantine/core";
import {StudyPlanBreadcrumbs} from "@/features/study-plan/components/StudyPlanBreadcrumbs.tsx";
import {LogOut} from "lucide-react";

export function StudyPlanHeader() {
    return (
            <Group justify="space-between">
                <StudyPlanBreadcrumbs/>

                <Group gap="lg">
                    <Badge variant="dot">Last update: 3 weeks ago</Badge>

                    <Avatar color="blue" variant="transparent" radius="xl"/>

                    <ActionIcon size="sm" variant="transparent">
                        <LogOut/>
                    </ActionIcon>
                </Group>
            </Group>
    );
}