import React from 'react';
import './CartItems.css';
import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import axios from '../../Api/axios';
import AuthContext from '../../Context/AuthProvider';
import { CartContext } from '../../Context/CartContext';

const CartItems = () => {
    const { cartItems, removeFromCart } = useContext(ShopContext);
    const {cartItemsCount, setCartItemsCount} = useContext(CartContext);
    const [allItems, setAllItems] = useState([]);
    const [allItemsImg, setAllItemsImg] = useState([]);
    const [finished, setFinished] = useState(false);
    const { auth } = useContext(AuthContext);
    useEffect(() => {
        console.log("Token: " + JSON.stringify(localStorage.token))
        axios.get("/api/v1/cartItems/item/getAll", {
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        }
        ).then((response) => {
            setAllItems(response.data.data);
            console.log("Fetched Items: " + JSON.stringify(response.data))
            setFinished(true)
        })
        

    }, []);
    useEffect(()=>{
        
        console.log("ENTERED")
        const updatedItems = [...allItems];
        console.log("All Items: " + JSON.stringify(updatedItems))
            Promise.all(
                
                updatedItems.map(async (item) => {
                    
                    if (!item.product.images[0].downloadUrl.startsWith("blob")) {
                        console.log("SENDING REQ");
                        await axios.get(item.product.images[0].downloadUrl,
                            { responseType: 'blob' }
                        )
                            .then((response) => {
                                const url = URL.createObjectURL(response.data);
                                item.product.images[0].downloadUrl = url;

                                console.log("Image URL: " + url);
                                
                            })
                    }
                })
            ).then(() => {
                // Safely update the state after all promises are resolved
                setAllItemsImg(updatedItems);
                
                

            });
        
    },[allItems])
    const placeOrder = () =>{
       const token = localStorage.getItem("token");
       const userId = localStorage.getItem("userId")
        axios.post("/api/v1/orders/order",null,{
            
            headers:{
                Authorization: `Bearer ${token}`
            },
            params: {
                userId: Number(userId)
            }
        }).then((response)=>{
            console.log("Order placed. " + JSON.stringify(response));
            setAllItemsImg([]);
            setCartItemsCount(0);
        }).catch((error)=>{
            console.log("ERROR: " + error)
        })
    }
    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {

                allItemsImg.map((item) => {


                    return (
                        <div>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={item.product.images[0].downloadUrl} alt="" className="carticon-product-icon" />
                                <p>{item.product.name}</p>
                                <p>${item.product.price}</p>
                                <button className="cartitems-quantity">{item.quantity}</button>

                                <p>${item.product.price * item.quantity}</p>
                                <img src={remove_icon} alt="" onClick={() => { removeFromCart(item.product.id,item.cartId, item.quantity);
                                    const newItems = allItemsImg.filter((current)=> current.itemId!==item.itemId);
                                    setAllItemsImg(newItems);
                                    console.log("Updated Items: " + JSON.stringify(newItems));
                                 }} className="cartitems-removeicon" />
                            </div>
                            <hr />
                        </div>);



                })}
            <div className="cartitems-total-value">
                <p>Total</p>
                <p>${Object.keys(allItemsImg).reduce((total, key) => {

                    let prod = allItemsImg[key].product.price * allItemsImg[key].quantity;
                    return total + prod;



                }, 0)}</p>
            </div>
            <button className="cart-checkout" onClick={()=>placeOrder()}>Place Order</button>
        </div>

    );
};

export default CartItems;