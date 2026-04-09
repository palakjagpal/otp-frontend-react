import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const client = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={client}>
    <StrictMode>
    <App />
  </StrictMode>
  </QueryClientProvider>,
)
