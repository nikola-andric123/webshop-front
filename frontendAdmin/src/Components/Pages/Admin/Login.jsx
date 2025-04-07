import React, { useState } from "react";
import axios from "../../../Api/axios";
import { useNavigate } from "react-router-dom";
import './Login.css'

const Login = () => {
    const [errMsg, setErrMsg] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = () => {
        axios.post('/api/v1/auth/login',{
            email: email,
            password: password
        }).then((response) => {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('userId', response.data.data.id)
            navigate("/app")
        }).catch((error)=>{
            console.log("ERROR: " + error)
        })
       
    }
    return(
        <div className="login">
            <div className="login-container">
                {errMsg.length>0?
                <div className="errorMsg">
                    <p>{errMsg}</p>
                </div>:<></>}
                <h1>Log In</h1>
                
                    <div className="login-form">
                    
                        
                        <input type="email" placeholder="Enter your email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required />
                        <input type="password" placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required />

                    </div>
                    <div className="login-button">

                    </div>
                    <button onClick={()=>handleLogin()}>Continue</button>
                
                
            </div>
        </div>
    )
}

export default Login;