import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './Context/AuthContext.tsx'
import { RestProvider } from './Context/REST-Context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RestProvider>
    <AuthProvider>
     <App />
    </AuthProvider>
    </RestProvider>
  </React.StrictMode>,
)
