import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import DashboardPage from './Pages/Dashboard/Dashboard-page'
import TablesPage from './Pages/Tables/Tables-page'
import CreateProductPage from './Pages/Create Product/Create-product'
import AdminPage from './Pages/Admin/Admin-page'
import LoginPage from './Pages/Login/Login'
import { useAuth } from '@/Context/AuthContext'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'

function App() {
  const { authenticated } = useAuth();
  const authRoutes = (
    <Routes>
    <Route path='/' element={<DashboardPage />} />
    <Route path='/Tables' element={<TablesPage />} />
    <Route path='/Create' element={<CreateProductPage />} />
    <Route path='/Admin' element={<AdminPage />} />
  </Routes>
  )
  const notAuthRoutes=(
    <Routes>
    <Route path='/' element={<LoginPage />} />
  </Routes>
  )
  console.log('here  authenticated: ',authenticated)
  return (
    <>
      <BrowserRouter>
        {authenticated ?authRoutes :notAuthRoutes}
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
