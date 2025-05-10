import {ActionIcon, AppShell} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {AppSidebar} from "@/shared/components/AppSidebar.tsx";
import {ReactNode} from "react";
import {AppHeader} from "@/shared/components/AppHeader.tsx";
import classes from './AppShell.module.css';
import {PanelLeftClose, PanelLeftOpen} from "lucide-react";

export function AppLayout({children}: { children: ReactNode }) {
    const [mobileOpened, {toggle: toggleMobile}] = useDisclosure();
    const [desktopOpened, {toggle: toggleDesktop}] = useDisclosure(true);

    const burger = (
        <>
            <ActionIcon variant="transparent" color="black" onClick={toggleMobile} hiddenFrom="sm" size="sm">
                {mobileOpened ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18}/>}
            </ActionIcon>
            <ActionIcon variant="transparent" color="black" onClick={toggleDesktop} visibleFrom="sm" size="sm">
                {desktopOpened ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18}/>}
            </ActionIcon>
        </>
    );

    return (
        <AppShell
            navbar={{
                width: '250',
                breakpoint: 'sm',
                collapsed: {mobile: !mobileOpened, desktop: !desktopOpened},
            }}
            header={{height: '60'}}
            padding="lg"
            classNames={{
                main: classes.main,
                navbar: classes.navbar,
                header: classes.header
            }}
        >
            <AppShell.Navbar>
                <AppSidebar/>
            </AppShell.Navbar>

            <AppShell.Header>
                <AppHeader burger={burger}/>
            </AppShell.Header>

            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    );
}
