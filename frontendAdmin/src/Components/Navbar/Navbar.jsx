import React from "react";
import './Navbar.css'
import navLogo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg'
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate()
    const handleLogin = () => {
    }
    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        navigate("/");
    }
    return(
        <div className="navbar">
            <img src={navLogo} alt="" className="nav-logo" />
            {localStorage.getItem("token")?<button onClick={()=> handleLogout()} className="nav-login-cart">Logout</button>:
            <button onClick={()=> handleLogin()} className="nav-login-cart">Login</button>}
        </div>
    )
}

export default Navbar;