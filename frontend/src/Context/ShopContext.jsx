import React, { createContext, useState, useEffect, useRef, useContext } from 'react';
//import allProducts from '../Components/Assets/all_product';
import axios from '../Api/axios';
import axiosPrivate from '../Api/axios';
import { loadOptions } from '@babel/core';
import AuthContext from './AuthProvider';
import { CartContext } from './CartContext';


export const ShopContext = createContext(null);
const getDefaultCart = () => {
    let cart = {}
    for (let index = 0; index < 100; index++) {
        cart[index] = 0;
    }
    return cart;
}
const ShopContextProvider = (props) => {
    
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [popularPhones, setPopularPhones] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [finished, setFinished] = useState(false);
    const [relatedFinished, setRelatedFinished] = useState(false);
    const [displayFinished, setDisplayFinished] = useState(false);
    const [newCollectionFinished, setNewCollectionFinished] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const {cartItemsCount, setCartItemsCount} = useContext(CartContext);
    
    const [productImages, setProductImages] = useState([]);
    const targetRef = useRef(null);
    const {logoutUser} = useContext(AuthContext)
    useEffect(() => {

        async function loadData() {
            await getPopularPhones();
            await getAllProducts();
            
        }
        loadData();
        return () => {
            if(popularPhones.data){
            popularPhones.data.forEach(phone => {
                URL.revokeObjectURL(phone.images[0].downloadUrl);
            });
        }
           
        };
    }, []);
    
    useEffect(() => {
        
        if (popularPhones.data && !finished) {
            const updatedPhones = [...popularPhones.data];
           
            Promise.all(
                updatedPhones.map(async (item) => {
                    console.log("ITEM: " + JSON.stringify(item))
                    await axios.get(item.images[0].downloadUrl,
                        { responseType: 'blob' }
                    )
                        .then((response) => {
                            const url = URL.createObjectURL(response.data);
                            item.images[0].downloadUrl = url;
                            
                        })
                })
            ).then(() => {
                // Safely update the state after all promises are resolved
                setPopularPhones((prev) => ({
                    ...prev,
                    data: updatedPhones,
                }));
                setFinished(true)
                
            });

        }},[popularPhones])
    const getPopularPhones = async () => {
        const category = 'Laptops';
        axios.get(`/api/v1/products/product/${category}/all/products`)
            .then((response) => {
                console.log("POPULAR PHONES " + response.data)
                setPopularPhones(response.data);
            })
    }
    const getAllProducts = async () => {
        axios.get('http://localhost:9191/api/v1/products/all')
            .then((response) => {
                
                setAllProducts(response.data.data)
            })
    }
    const addToCart = (itemId) => {
        
        console.log("TOKEN: " + localStorage.getItem("token"))
        const token = localStorage.getItem("token");
        return axios.post("/api/v1/cartItems/item/add",
            null,
            {
            headers:{
                Authorization: `Bearer ${token}`
            },
            params: {
                productId: itemId,
                quantity: 1
            }
        }).then((response)=>{
            //setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
            setCartItemsCount(cartItemsCount + 1)
            console.log("Response: " + JSON.stringify(response.data))
            return true;
        }).catch((error)=>{
            if (error.response && error.response.status === 401) {
                logoutUser();
              }
              // Rethrow the error so that further error handling can occur if needed.
              //return Promise.reject(error);

              return false;
        })
        
    }
    const removeFromCart = (itemId, cartId, quantity) => {
        axios.delete(`/api/v1/cartItems/cart/${cartId}/item/${itemId}/remove`,{
            headers:{
                Authorization: `Bearer ${localStorage.token}`
            }
        })
        .then((response)=>{
            console.log("Response: " + JSON.stringify(response))
            setCartItemsCount(cartItemsCount-quantity)
        })
    }
    
    const contextValue = { allProducts, cartItems, popularPhones, setPopularPhones, targetRef,
        newCollectionFinished, setNewCollectionFinished, relatedFinished, setRelatedFinished,
        displayFinished, setDisplayFinished, productImages, setProductImages, selectedImage, setSelectedImage,
        addToCart, removeFromCart };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;