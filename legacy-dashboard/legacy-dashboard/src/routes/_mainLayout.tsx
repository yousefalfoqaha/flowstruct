import {createFileRoute, Outlet} from '@tanstack/react-router'
import {AppLayout} from "@/shared/components/AppLayout.tsx";
import {SidebarLink} from "@/shared/types.ts";
import {BookOpen, GraduationCap, LayoutPanelLeft, ScrollText} from "lucide-react";
import {Route as DashboardRoute} from "./_mainLayout/index.tsx";
import {Route as ProgramsRoute} from "./_mainLayout/programs.tsx";
import {Route as CoursesRoute} from "./_mainLayout/courses.tsx";
import {Route as StudyPlansRoute} from "./_mainLayout/study-plans.tsx";
import {Title, Text} from '@mantine/core';

export const Route = createFileRoute('/_mainLayout')({
    component: RouteComponent,
});

const data: SidebarLink[] = [
    {label: 'Dashboard', icon: LayoutPanelLeft, route: DashboardRoute.to},
    {label: 'Programs', icon: GraduationCap, route: ProgramsRoute.to},
    {label: 'Study Plans', icon: ScrollText, route: StudyPlansRoute.to},
    {label: 'Courses', icon: BookOpen, route: CoursesRoute.to}
];

function RouteComponent() {
    const sidebarHeader = () => (
        <>
            <Title order={3} fw={600} pb={8}>GJUPlans Admin Dashboard</Title>
            <Text size="sm" c="dimmed">Last update: 2 weeks ago</Text>
        </>
    );

    return (
        <AppLayout sidebarHeader={sidebarHeader()} sidebarData={data}>
            <Outlet/>
        </AppLayout>
    );
}
