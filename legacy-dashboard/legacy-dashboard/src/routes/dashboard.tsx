import {createFileRoute, Outlet} from '@tanstack/react-router'
import {AppLayout} from '@/shared/components/AppLayout.tsx'
import {SidebarLink} from '@/shared/types.ts'
import {
    BookOpen,
    GraduationCap,
    LayoutPanelLeft,
    ScrollText,
} from 'lucide-react'
import {Route as DashboardRoute} from './dashboard/index.tsx'
import {Route as ProgramsRoute} from './dashboard/programs'
import {Route as CoursesRoute} from './dashboard/courses.tsx'
import {Route as StudyPlansRoute} from './dashboard/study-plans.tsx'
import {Title, Text} from '@mantine/core'

export const Route = createFileRoute('/dashboard')({
    component: RouteComponent,
})

const data: SidebarLink[] = [
    {label: 'Dashboard', icon: LayoutPanelLeft, route: DashboardRoute.to},
    {label: 'Programs', icon: GraduationCap, route: ProgramsRoute.to},
    {label: 'Study Plans', icon: ScrollText, route: StudyPlansRoute.to},
    {label: 'Courses', icon: BookOpen, route: CoursesRoute.to},
]

function RouteComponent() {
    const sidebarHeader = () => (
        <>
            <Title order={3} fw={600} pb={8}>
                GJUPlans Admin Dashboard
            </Title>
            <Text size="sm" c="dimmed">
                Last update: 2 weeks ago
            </Text>
        </>
    )

    return (
        <AppLayout sidebarHeader={sidebarHeader()} sidebarData={data}>
            <Outlet/>
        </AppLayout>
    )
}
