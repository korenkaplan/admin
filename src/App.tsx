import {Routes, Route, BrowserRouter} from 'react-router-dom'
import DashboardPage from './Pages/Dashboard/Dashboard-page'
import TablesPage from './Pages/Tables/Tables-page'
import CreateProductPage from './Pages/Create Product/Create-product'
import AdminPage from './Pages/Admin/Admin-page'
import LoginPage from './Pages/Login/Login'
import {useAuth} from '@/Context/AuthContext'
function App() {
  const { authenticated } = useAuth();
  return (
    <>
    <BrowserRouter>
      <Routes>
       { <Route path='/'  element={<LoginPage/>}/>}
       {authenticated &&<Route path='/Dashboard'  element={<DashboardPage/>}/>}
       {authenticated &&<Route path='/Tables'  element={<TablesPage/>}/>}
       {authenticated &&<Route path='/Create'  element={<CreateProductPage/>}/>}
       {authenticated &&<Route path='/Admin'  element={<AdminPage/>}/>}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
