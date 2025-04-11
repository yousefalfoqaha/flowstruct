import {ActionIcon, Avatar, Burger, Button, Group, MantineSize} from "@mantine/core";
import {LogOut, Upload} from "lucide-react";
import {ProgramsBreadcrumbs} from "@/features/program/components/ProgramsBreadcrumbs.tsx";

type ProgramsHeaderProps = {
    toggleSidebar: () => void;
    mobileBreakpoint: MantineSize;
}

export function ProgramsHeader({toggleSidebar, mobileBreakpoint}: ProgramsHeaderProps) {
    return (
        <Group justify="space-between">
            <Group gap="xl">
                <Burger
                    onClick={toggleSidebar}
                    hiddenFrom={mobileBreakpoint}
                    size="sm"
                />

                <ProgramsBreadcrumbs/>
            </Group>

            <Group gap="lg">
                <Avatar
                    color="blue"
                    variant="transparent"
                    radius="xl"
                />

                <ActionIcon
                    size="sm"
                    variant="transparent"
                >
                    <LogOut/>
                </ActionIcon>
            </Group>
        </Group>
    );
}
