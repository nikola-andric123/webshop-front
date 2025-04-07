import React from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import orders_icon from "../Assets/shopping-cart_6054048.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { CartContext } from "../../Context/CartContext";
import AuthContext from "../../Context/AuthProvider";

const Navbar = () => {

    const [menu, setMenu] = useState("shop");
    const {getCartItemsCount} = useContext(ShopContext);
    const {cartItemsCount, setCartItemsCount} = useContext(CartContext);
    const {logoutUser} = useContext(AuthContext);
    return (
        <div className="navbar-container">
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="logo" />
                <p>SHOPPER</p>
            </div>
            <ul className="nav-menu">
                <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu==="shop" ? (<hr/>):(null)}</li>
                <li onClick={()=>{setMenu("mobile")}}><Link style={{textDecoration: 'none'}} to='/mobile'>Mobile</Link>{menu==="mobile" ? (<hr/>):(null)}</li>
                <li onClick={()=>{setMenu("tv")}}><Link style={{textDecoration: 'none'}} to='/tv'>TV, Video</Link>{menu==="tv" ? (<hr/>):(null)}</li>
                <li onClick={()=>{setMenu("computers")}}><Link style={{textDecoration: 'none'}} to='/computer'>Computers</Link>{menu==="computers" ? (<hr/>):(null)}</li>
                <li onClick={()=>{setMenu("appliances")}}><Link style={{textDecoration: 'none'}} to='/appliance'>Home Appliances</Link>{menu==="appliances" ? (<hr/>):(null)}</li>
                <li onClick={()=>{setMenu("beauty")}}><Link style={{textDecoration: 'none'}} to='/beauty'>Health & Beauty</Link>{menu==="beauty" ? (<hr/>):(null)}</li>
                <li onClick={()=>{setMenu("gadgets")}}><Link style={{textDecoration: 'none'}} to='/gadget'>Gadgets</Link>{menu==="gadgets" ? (<hr/>):(null)}</li>
            </ul>
            <div className="nav-login-cart">
                {!localStorage.getItem("token")&&
                    <Link to='/login'><button>Login</button></Link>
                }
                {localStorage.getItem("token")&&
                    <p className="HelloMsg">Hello, {localStorage.getItem("firstName")}</p>
                }
                {localStorage.getItem("token")?<><Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{cartItemsCount}</div></>:<></>}
               {localStorage.getItem("token")&&
                    <Link to='/orders'><img className="cart-orders" src={orders_icon} /></Link>
                }
                {localStorage.getItem("token")&&
                    <button onClick={logoutUser}>Logout</button>
                }
                
            </div>
           
        </div>
         <hr/>
        </div>
    );
    };

export default Navbar;