import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './Components/Pages/Admin/Login.jsx'
import Admin from './Components/Pages/Admin/Admin.jsx'
import AddProduct from './Components/AddProduct/AddProduct.jsx'
import ListProduct from './Components/ListProduct/ListProduct.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/app/*" element={<App />}>
        <Route path="admin/*" element={<Admin />}>
          
        </Route>
      </Route>
        <Route path='/' element={<Login />} />
    </Routes>    
    </BrowserRouter>
  </StrictMode>,
)
