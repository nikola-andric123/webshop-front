import React from "react";
import './Sidebar.css'
import { Link } from "react-router-dom";
import addProductIcon from '../../assets/Product_cart.svg';
import listProductIcon from '../../assets/Product_list_icon.svg';

const Sidebar = () => {

    return(
        <div className="sidebar">
            <Link to={'/app/addProduct'} style={{textDecoration: "none"}}>
                <div className="sidebar-item">
                    <img src={addProductIcon} alt="" />
                    <p>Add product</p>
                </div>
            
            </Link>
            <Link to={'/app/listProduct'} style={{textDecoration: "none"}}>
                <div className="sidebar-item">
                    <img src={listProductIcon} alt="" />
                    <p>Product list</p>
                </div>
            
            </Link>
            <Link to={'/app/ordersList'} style={{textDecoration: "none"}}>
                <div className="sidebar-item">
                    <img src={listProductIcon} alt="" />
                    <p>Orders list</p>
                </div>
            
            </Link>
        </div>
    )
}

export default Sidebar;