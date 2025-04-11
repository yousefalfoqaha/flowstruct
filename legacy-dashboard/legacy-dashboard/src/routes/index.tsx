import {createFileRoute} from '@tanstack/react-router'
import {ProgramsTable} from '@/features/program/components/ProgramsTable.tsx'
import {getProgramListQuery} from '@/features/program/queries.ts'
import {useDisclosure} from '@mantine/hooks'
import {AppShell, Stack, Title} from '@mantine/core'
import {IndexSidebar} from "@/shared/components/IndexSidebar.tsx";
import {ProgramsHeader} from "@/features/program/components/ProgramsHeader.tsx";

export const Route = createFileRoute('/')({
    component: Index,
    loader: async ({context: {queryClient}}) => {
        await queryClient.ensureQueryData(getProgramListQuery)
    },
})

function Index() {
    const [sidebarOpened, {toggle}] = useDisclosure()
    const MOBILE_BREAKPOINT = 'xl'

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
                <IndexSidebar closeSidebar={toggle}/>
            </AppShell.Navbar>

            <AppShell.Main>
                <Stack gap="lg">
                    <ProgramsHeader toggleSidebar={toggle} mobileBreakpoint={MOBILE_BREAKPOINT}/>
                    <Title fw={600}>All Programs</Title>
                    <ProgramsTable/>
                </Stack>
            </AppShell.Main>
        </AppShell>
    )
}
