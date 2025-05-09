import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import {createRouter, RouterProvider} from '@tanstack/react-router';
import {routeTree} from './routeTree.gen';
import '@mantine/core/styles.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {MantineProvider} from "@mantine/core";
import {ModalsProvider} from "@mantine/modals";
import {Notifications} from "@mantine/notifications";
import classes from "@/shared/components/NavigationProgress.module.css";
import {NavigationProgress} from "@mantine/nprogress";
import {NotFoundPage} from "@/shared/components/NotFoundPage.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 300000
        }
    }
});

export const router = createRouter({
    routeTree,
    context: {queryClient},
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
    defaultNotFoundComponent: () => <NotFoundPage />
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <MantineProvider>
                <NavigationProgress className={classes.progress}/>
                <ModalsProvider>
                    <RouterProvider router={router}/>
                </ModalsProvider>
                <Notifications/>
            </MantineProvider>
        </QueryClientProvider>
    </StrictMode>
);
