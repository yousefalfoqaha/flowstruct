import classes from './StudyPlanSidebar.module.css';
import {ArrowRightLeft, Folder, LogOut, ScrollText, Map, Settings} from "lucide-react";
import {Link, useRouterState} from "@tanstack/react-router";
import {Badge, Stack, Text, Title} from "@mantine/core";
import {useStudyPlan} from "@/features/study-plan/hooks/useStudyPlan.ts";
import {useProgram} from "@/features/program/hooks/useProgram.ts";

const data = [
    {label: 'Overview', icon: ScrollText, page: 'overview' as const},
    {label: 'Framework', icon: Folder, page: 'framework' as const},
    {label: 'Program Map', icon: Map, page: 'program-map' as const}
];

export function StudyPlanSidebar({studyPlanId}: { studyPlanId: number }) {
    const {location} = useRouterState();
    const segments = location.pathname.split('/');
    const activePage = segments.pop();
    const {data: studyPlan} = useStudyPlan(studyPlanId);
    const {data: program} = useProgram(studyPlan.program);

    const links = data.map((item) => {
        const Icon = item.icon;
        return (
            <Link
                to={`/study-plans/$studyPlanId/${item.page}`}
                params={{
                    studyPlanId: String(studyPlanId)
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
            <Stack className={classes.header} gap={0}>
                <Title order={3} fw={600} pb={8}>
                    {program.degree} {program.name} <Badge variant="gradient">{program.code}</Badge>
                </Title>
                <Text size="sm" c="dimmed">{studyPlan.year}/{studyPlan.year + 1} {studyPlan.track && `- ${studyPlan.track}`}</Text>
            </Stack>

            <div className={classes.navbarMain}>
                {links}
            </div>

            <div className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <Settings className={classes.linkIcon} strokeWidth="1.5"/>
                    <span>Settings</span>
                </a>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <ArrowRightLeft className={classes.linkIcon} strokeWidth="1.5"/>
                    <span>Change account</span>
                </a>

            </div>
        </nav>
    );
}