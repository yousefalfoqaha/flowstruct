import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SemestersProvider } from './providers/SemestersProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SemestersProvider>
        <App />
    </SemestersProvider>
  </StrictMode>
)
