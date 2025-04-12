import {Link} from "@tanstack/react-router";
import classes from "@/shared/components/AppSidebar.module.css";
import {ActionIcon} from "@mantine/core";
import {Settings, X} from "lucide-react";
import {SidebarLink} from "@/shared/types.ts";
import {ReactNode} from "react";

type AppSidebarProps = {
    sidebarHeader: ReactNode;
    data: SidebarLink[];
    closeSidebar: () => void;
}

export function AppSidebar({sidebarHeader, data, closeSidebar}: AppSidebarProps) {

    const links = data.map((item) => {
        const Icon = item.icon;
        return (
            <Link
                to={item.route}
                className={classes.link}
                activeOptions={{exact: true}}
                key={item.route}
            >
                <Icon className={classes.linkIcon} strokeWidth="1.5"/>
                <span>{item.label}</span>
            </Link>
        );
    });

    return (
        <nav className={classes.navbar}>
            <ActionIcon
                hiddenFrom="xl"
                onClick={closeSidebar}
                variant="white"
                color="black"
                className={classes.close}
            >
                <X strokeWidth={1.5}/>
            </ActionIcon>

            <div className={classes.header}>{sidebarHeader}</div>

            <div className={classes.navbarMain}>
                {links}
            </div>

            <div className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <Settings className={classes.linkIcon} strokeWidth="1.5"/>
                    <span>Settings</span>
                </a>
            </div>
        </nav>
    );
}
