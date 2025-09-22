import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import rout from './Routs/Routs.jsx'
import AuthProvider from './Authantiation/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={rout} />
    </AuthProvider>
  </StrictMode>,
)
