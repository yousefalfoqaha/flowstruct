import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Toaster} from "@/components/ui/toaster.tsx";
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <div className="text-gray-800 max-w-screen-2xl mx-auto border-x h-screen">
          <RouterProvider router={router} />
      </div>
      <Toaster />
  </StrictMode>
);
