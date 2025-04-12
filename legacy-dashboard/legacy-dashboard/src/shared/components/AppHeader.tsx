import {ActionIcon, Avatar, Burger, Group, MantineSize} from "@mantine/core";
import {LogOut} from "lucide-react";
import {AppBreadcrumbs} from "@/shared/components/AppBreadcrumbs.tsx";

type AppHeaderProps = {
    toggleSidebar: () => void;
    mobileBreakpoint: MantineSize;
}

export function AppHeader({toggleSidebar, mobileBreakpoint}: AppHeaderProps) {
    return (
        <Group style={{height: '100%'}} px="lg" justify="space-between">
            <Group gap="xl">
                <Burger
                    onClick={toggleSidebar}
                    hiddenFrom={mobileBreakpoint}
                    size="sm"
                />

                <AppBreadcrumbs/>
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
