import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    useEffect(() => {
        
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setAuth({token: storedToken });
        }
      }, []);
      const logoutUser = ()=>{
        localStorage.removeItem("token") // Handle logout when token expires
        console.log("Local Storage: " + localStorage.getItem("token"))
        setAuth({token: null})
      }
    return (
        <AuthContext.Provider value={{ auth, setAuth, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;