import {createRootRouteWithContext, Link, Outlet} from '@tanstack/react-router'
import {QueryClient} from "@tanstack/react-query";
import {AppShell, Burger} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
    component: Root
});

function Root() {
    const [opened, {toggle}] = useDisclosure();

    return (
        <>
            <AppShell
                header={{height: 60}}
                navbar={{
                    width: 300,
                    breakpoint: 'sm',
                    collapsed: {mobile: !opened},
                }}
                padding="md"
            >
                <AppShell.Header>
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <div>Logo</div>
                </AppShell.Header>

                <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

                <AppShell.Main>
                    <Outlet/>
                </AppShell.Main>
            </AppShell>
            {/*<TanStackRouterDevtools/>*/}
        </>
    );
}