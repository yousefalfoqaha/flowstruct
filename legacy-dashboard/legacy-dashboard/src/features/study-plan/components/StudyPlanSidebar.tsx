import classes from './StudyPlanSidebar.module.css';
import {Folder, ScrollText, Map, Settings, X, Pencil} from "lucide-react";
import {Link, useRouterState} from "@tanstack/react-router";
import {ActionIcon, Button, Stack, Text, Title} from "@mantine/core";
import {useProgram} from "@/features/program/hooks/useProgram.ts";
import {openModal} from "@mantine/modals";
import {EditStudyPlanDetailsModal} from "@/features/study-plan/components/EditStudyPlanDetailsModal.tsx";
import {StudyPlan} from "@/features/study-plan/types.ts";

const data = [
    {label: 'Overview', icon: ScrollText, page: 'overview' as const},
    {label: 'Framework', icon: Folder, page: 'framework' as const},
    {label: 'Program Map', icon: Map, page: 'program-map' as const}
];

type StudyPlanSidebarProps = {
    studyPlan: StudyPlan;
    closeSidebar: () => void;
}

export function StudyPlanSidebar({studyPlan, closeSidebar}: StudyPlanSidebarProps) {
    const {location} = useRouterState();
    const segments = location.pathname.split('/');
    const activePage = segments.pop();

    const {data: program} = useProgram();

    const studyPlanDisplayName = `${studyPlan.year}-${studyPlan.year + 1} ${studyPlan.track ?? ''}`;

    const links = data.map((item) => {
        const Icon = item.icon;
        return (
            <Link
                to={`/study-plans/$studyPlanId/${item.page}`}
                params={{
                    studyPlanId: String(studyPlan.id)
                }}
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
            <Stack className={classes.header} gap={0}>
                <Title order={3} fw={600} pb={8}>{program.degree} {program.name}</Title>

                <Text size="sm" c="dimmed">{studyPlanDisplayName}</Text>

                <Button
                    size="sm"
                    mt="md"
                    leftSection={<Pencil size={14}/>}
                    variant="default"
                    onClick={() =>
                        openModal({
                            title: `Edit Study Plan Details`,
                            centered: true,
                            children: <EditStudyPlanDetailsModal studyPlan={studyPlan}/>
                        })}
                >
                    Edit Details
                </Button>
            </Stack>

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