import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {Toaster} from "@/components/ui/toaster.tsx";
import {createRouter, RouterProvider} from '@tanstack/react-router';
import {routeTree} from './routeTree.gen';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const router = createRouter({
    routeTree,
    context: {queryClient},
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div className="text-gray-800 max-w-screen-2xl mx-auto border-x h-screen">
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
                {/*<ReactQueryDevtools initialIsOpen={false}/>*/}
            </QueryClientProvider>
        </div>
        <Toaster/>
    </StrictMode>
);
