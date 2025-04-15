import {Link} from "@tanstack/react-router";
import classes from "@/shared/components/AppSidebar.module.css";
import {ActionIcon, Text, Title} from "@mantine/core";
import {BookOpen, GraduationCap, LayoutPanelLeft, Logs, ScrollText, Settings, X} from "lucide-react";
import {SidebarLink} from "@/shared/types.ts";
import {Route as DashboardRoute} from "@/routes/_layout/dashboard";
import {Route as ProgramsRoute} from "@/routes/_layout/programs/route.tsx";
import {Route as StudyPlansRoute} from "@/routes/_layout/study-plans/route.tsx";
import {Route as CoursesRoute} from "@/routes/_layout/courses";
import {Route as LogsRoute} from "@/routes/_layout/logs";

const data: SidebarLink[] = [
    {label: 'Dashboard', icon: LayoutPanelLeft, route: DashboardRoute.to},
    {label: 'Programs', icon: GraduationCap, route: ProgramsRoute.to},
    {label: 'Study Plans', icon: ScrollText, route: StudyPlansRoute.to},
    {label: 'Courses', icon: BookOpen, route: CoursesRoute.to},
    {label: 'Logs', icon: Logs, route: LogsRoute.to}
];

type AppSidebarProps = {
    closeSidebar: () => void;
}

export function AppSidebar({closeSidebar}: AppSidebarProps) {
    const links = data.map((item) => {
        const Icon = item.icon;
        return (
            <Link
                to={item.route}
                className={classes.link}
                activeOptions={{exact: false}}
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

            <div className={classes.header}>
                <Title order={3} fw={600} pb={8}>
                    GJUPlans Admin Dashboard
                </Title>
                <Text size="sm" c="dimmed">
                    Last update: 2 weeks ago
                </Text>
            </div>

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
