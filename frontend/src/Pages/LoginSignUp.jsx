import React from "react";
import "./CSS/LoginSignUp.css";
import axios from "../Api/axios";
import { useState, useContext } from "react";
import { AuthContext } from '../Context/AuthProvider'
import { useNavigate } from 'react-router-dom';
import { CartContext } from "../Context/CartContext";


const LoginSignUp = () => {

    const { auth, setAuth } = useContext(AuthContext)
    const { cartItemsCount, setCartItemsCount } = useContext(CartContext);
    const [state, setState] = useState("login");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
        

        try {

            const response = await axios.post('/api/v1/auth/login',
                {
                    email: user,
                    password: pwd
                }
            ).then((response) => {
                console.log("Response " + JSON.stringify(response?.data));
                //console.log(JSON.stringify(response));
                const accessToken = response.data.data.token;
                if (accessToken) {
                    localStorage.setItem('token', accessToken);
                    localStorage.setItem('userId', response.data.data.id)
                    setAuth({ token: accessToken });
                    navigate("/")
                }
               axios.get("/api/v1/cartItems/item/getAll", {
                           headers: {
                               Authorization: `Bearer ${accessToken}`
                           }
                       }
                       ).then((response) => {
                        const totalQuantity = response.data.data.reduce((quantity, item)=> {
                                
                                return quantity + item.quantity;
                            },0)
                           setCartItemsCount(totalQuantity);
                           
                           
                       })
                axios.get(`/api/v1/users/${response.data.data.id}/user`)
                    .then((user) => {
                        console.log("User returned: " + JSON.stringify(user))
                        localStorage.setItem("firstName", user.data.data.firstName)
                    })
            })


        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }

        }
    }
    const handleSignup = async ()=>{
        console.log("Handle signup")
        axios.post("/api/v1/auth/register",
            {
                firstName: firstName,
                lastName: lastName,
                email: user,
                password: pwd
            }
        ).then((response)=>{
            console.log("Register token: " + JSON.stringify(response));
            const accessToken = response.data.data.token;
                if (accessToken) {
                    localStorage.setItem('token', accessToken);
                    localStorage.setItem('userId', response.data.data.id)
                    setAuth({ token: accessToken });
                    navigate("/")
                }

            axios.get(`/api/v1/users/${response.data.data.id}/user`)
                    .then((user) => {
                        console.log("User returned: " + JSON.stringify(user))
                        localStorage.setItem("firstName", user.data.data.firstName)
                    })
        }).catch((err)=>{
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');

            } else if(err.response?.status === 409) {
                setErrMsg('User with same email already exists');
            }
            else{
                setErrMsg('Register failed');
            }
        })
    }
    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                {errMsg.length>0?
                <div className="errorMsg">
                    <p>{errMsg}</p>
                </div>:<></>}
                {state==="signUp"?<h1>Sign Up</h1>:<h1>Log In</h1>}
                
                    <div className="loginsignup-form">
                    {state==="signUp"?
                        <input type="text" placeholder="Enter your first name" 
                        autoComplete="off"
                        onChange={(e) => setFirstName(e.target.value)}/>:<></>}
                        {state==="signUp"?
                        <input type="text" placeholder="Enter your last name" 
                        autoComplete="off"
                        onChange={(e) => setLastName(e.target.value)}/>:<></>}
                        <input type="email" placeholder="Enter your email"
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required />
                        <input type="password" placeholder="Enter your password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required />

                    </div>
                    <div className="loginsignup-button">

                    </div>
                    <button onClick={()=>{state==="login"?handleLogin():handleSignup()}}>Continue</button>
                
                {state==="signUp"?<p className="loginsignup-login">Already have an account? <span onClick={() => setState("login")}>Login here</span></p>:
                <></>}
                {state==="login"?<p className="loginsignup-login">Do not have an account? <span onClick={() => setState("signUp")}>Sign up here</span></p>:
                <></>}
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By continuing, i agree to the terms of use and privacy policy</p>
                </div>
            </div>
        </div>
    );
};

export default LoginSignUp;