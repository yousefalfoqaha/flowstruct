import {AppShell} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {AppSidebar} from "@/shared/components/AppSidebar.tsx";
import {SidebarLink} from "@/shared/types.ts";
import {ReactNode} from "react";
import {AppHeader} from "@/shared/components/AppHeader.tsx";

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
            header={{height: '60'}}
            padding="xl"
            layout="alt"
        >
            <AppShell.Navbar p="lg">
                <AppSidebar sidebarHeader={sidebarHeader} data={sidebarData} closeSidebar={toggle}/>
            </AppShell.Navbar>

            <AppShell.Header>
                <AppHeader toggleSidebar={toggle} mobileBreakpoint={MOBILE_BREAKPOINT}/>
            </AppShell.Header>

            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    );
}
