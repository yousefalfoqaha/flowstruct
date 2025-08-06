import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import '@mantine/core/styles.css';
import { matchQuery, MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTheme, LoadingOverlay, MantineColorsTuple, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { notifications, Notifications } from '@mantine/notifications';
import navigationProgressClasses from '@/shared/styles/NavigationProgress.module.css';
import { NavigationProgress } from '@mantine/nprogress';
import { NotFoundPage } from '@/shared/components/NotFoundPage.tsx';
import themeClasses from './theme.module.css';
import { Check, X } from 'lucide-react';
import { ErrorObject } from '@/shared/types.ts';

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (data, variables, context, mutation) => {
      const invalidatesMeta = mutation.meta?.invalidates;
      const removesMeta = mutation.meta?.removes;

      if (invalidatesMeta) {
        const resolvedInvalidatesMeta =
          typeof invalidatesMeta === 'function'
            ? invalidatesMeta(data, variables, context)
            : invalidatesMeta;

        queryClient.invalidateQueries({
          predicate: (query) =>
            resolvedInvalidatesMeta.some((queryKey) => matchQuery({ queryKey }, query)) ?? false,
        });
      }

      if (removesMeta) {
        const resolvedRemovesMeta =
          typeof removesMeta === 'function' ? removesMeta(data, variables, context) : removesMeta;

        queryClient.removeQueries({
          predicate: (query) =>
            resolvedRemovesMeta.some((queryKey) => matchQuery({ queryKey }, query)) ?? false,
        });
      }

      const setDataMeta = mutation.meta?.setData;
      if (setDataMeta) {
        const queryKey =
          typeof setDataMeta === 'function' ? setDataMeta(data, variables, context) : setDataMeta;

        queryClient.setQueryData(queryKey, data);
      }

      const successMessage = mutation.meta?.successMessage;
      if (successMessage) {
        notifications.show({
          title: 'Success!',
          message:
            typeof successMessage === 'function'
              ? successMessage(data, variables, context)
              : successMessage,
          color: 'green',
          icon: <Check size={18} />,
          withBorder: true,
        });
      }
    },
    onError: (error) => {
      queryClient.invalidateQueries();

      const errorObject = error as unknown as ErrorObject;

      errorObject.messages.forEach((message) => {
        notifications.show({
          title: 'Error...',
          message: message || 'An unknown error occurred',
          color: 'red',
          icon: <X size={18} />,
          withBorder: true,
        });
      });
    },
  }),
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
    <LoadingOverlay visible zIndex={1000} loaderProps={{ type: 'bars' }} />
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
