import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext.tsx'
import { GeneralProvider } from './context/GeneralContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
    <GeneralProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </GeneralProvider>
    </UserProvider>
  </React.StrictMode>,
)
