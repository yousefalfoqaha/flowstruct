import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Toaster} from "@/components/ui/toaster.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <div className="text-gray-800 max-w-screen-2xl mx-auto border-x h-screen">
          <App />
      </div>
      <Toaster />
  </StrictMode>
);
