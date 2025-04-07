import React from 'react';
import './Admin.css'
import Sidebar from '../../Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from '../../AddProduct/AddProduct';
import ListProduct from '../../ListProduct/ListProduct';
import Login from './Login';
import OrdersList from '../../OrdersList/OrdersList';

const Admin = () =>{

    return(
        <div className='admin'>
            
            <Sidebar />
            <Routes>
                <Route path='addProduct' element={<AddProduct/>} />
                <Route path='listProduct' element={<ListProduct/>} />
                <Route path='ordersList' element={<OrdersList/>} />

            </Routes>
            
        </div>
    )
}

export default Admin;