import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import MigrationProvider from "../services/MigrationProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <MigrationProvider>
          <App />
      </MigrationProvider>
  </StrictMode>,
)
