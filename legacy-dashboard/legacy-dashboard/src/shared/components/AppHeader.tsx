import {ActionIcon, Avatar, Burger, Group, MantineSize} from "@mantine/core";
import {LogOut} from "lucide-react";
import {AppBreadcrumbs} from "@/shared/components/AppBreadcrumbs.tsx";
import Cookies from "js-cookie";
import {useNavigate} from "@tanstack/react-router";

type AppHeaderProps = {
    toggleSidebar: () => void;
    mobileBreakpoint: MantineSize;
}

export function AppHeader({toggleSidebar, mobileBreakpoint}: AppHeaderProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('accessToken');
        navigate({to: '/login'});
    }

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
                    onClick={handleLogout}
                >
                    <LogOut/>
                </ActionIcon>
            </Group>
        </Group>
    );
}
