import React, {createContext, useState, useEffect} from 'react';


export const CartContext = createContext(null);

const CartContextProvider = (props)=>{
const [cartItemsCount, setCartItemsCount] = useState(0);


const contextValue = {cartItemsCount, setCartItemsCount}
    return(
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;