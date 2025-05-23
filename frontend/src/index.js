import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './Context/ShopContext';
import { AuthProvider } from './Context/AuthProvider';
import Modal from "react-modal";
import CartContextProvider from './Context/CartContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

Modal.setAppElement("#root");
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartContextProvider>
    <ShopContextProvider>
      
      <App />
      
    </ShopContextProvider>
    </CartContextProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
