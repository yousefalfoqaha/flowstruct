import {Link, useRouterState} from "@tanstack/react-router";
import classes from "@/features/study-plan/components/StudyPlanSidebar.module.css";
import {ActionIcon, Text, Title} from "@mantine/core";
import {GraduationCap, LibraryBig, Settings, X} from "lucide-react";

const data = [
    {label: 'Programs', icon: GraduationCap, page: '' as const},
    {label: 'Courses', icon: LibraryBig, page: 'courses' as const}
];

type IndexSidebarProps = {
    closeSidebar: () => void;
}

export function IndexSidebar({closeSidebar}: IndexSidebarProps) {
    const {location} = useRouterState();
    const activePage = location.pathname.split('/').pop();

    const links = data.map((item) => {
        const Icon = item.icon;
        return (
            <Link
                to={`/${item.page}`}
                className={classes.link}
                data-active={item.page === activePage || undefined}
                key={item.page}
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
                <Title order={3} fw={600} pb={8}>GJUPlans Admin Dashboard</Title>
                <Text size="sm" c="dimmed">Last update: 2 weeks ago</Text>
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