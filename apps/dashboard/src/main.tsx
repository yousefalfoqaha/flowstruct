import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import '@mantine/core/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTheme, LoadingOverlay, MantineColorsTuple, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import navigationProgressClasses from '@/shared/components/NavigationProgress.module.css';
import { NavigationProgress } from '@mantine/nprogress';
import { NotFoundPage } from '@/shared/components/NotFoundPage.tsx';
import themeClasses from './theme.module.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,
    },
  },
});

export const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  defaultNotFoundComponent: () => <NotFoundPage />,
  defaultPendingComponent: () => (
    <LoadingOverlay
      visible
      zIndex={1000}
      overlayProps={{ radius: 'sm', blur: 2 }}
      loaderProps={{ type: 'bars' }}
    />
  ),
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const gjuColors: MantineColorsTuple = [
  '#e9f6ff',
  '#d7e8f8',
  '#aecfed',
  '#81b4e3',
  '#5d9edb',
  '#4790d6',
  '#3989d5',
  '#2b76bd',
  '#206bae',
  '#055a97',
];

const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  primaryColor: 'gju',
  colors: {
    gju: gjuColors,
  },
  activeClassName: themeClasses.active,
  defaultRadius: 'md',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <NavigationProgress className={navigationProgressClasses.progress} />
        <ModalsProvider>
          <RouterProvider router={router} />
        </ModalsProvider>
        <Notifications />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
