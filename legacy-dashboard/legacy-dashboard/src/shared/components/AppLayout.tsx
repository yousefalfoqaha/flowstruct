import {AppShell} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {Sidebar} from "@/shared/components/Sidebar.tsx";
import {SidebarLink} from "@/shared/types.ts";
import {ReactNode} from "react";

type AppLayoutProps = {
    sidebarHeader?: ReactNode;
    sidebarData: SidebarLink[];
    children: ReactNode;
}

export function AppLayout({sidebarHeader, sidebarData, children}: AppLayoutProps) {
    const [sidebarOpened, {toggle}] = useDisclosure();
    const MOBILE_BREAKPOINT = 'xl';

    return (
        <AppShell
            navbar={{
                width: '250',
                breakpoint: MOBILE_BREAKPOINT,
                collapsed: {mobile: !sidebarOpened},
            }}
            padding="xl"
        >
            <AppShell.Navbar p="lg">
                <Sidebar sidebarHeader={sidebarHeader} data={sidebarData} closeSidebar={toggle} />
            </AppShell.Navbar>

            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    );
}