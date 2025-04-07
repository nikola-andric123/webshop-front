import React, { useEffect, useState } from "react";
import './ListProduct.css';
import axios from "../../Api/axios";
import { all } from "axios";
import cross_icon from '../../assets/cart_cross_icon.png'


const ListProduct = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [errMsg, setErrMsg] = useState([]);

    const [allProductsImg, setAllProductsImg] = useState([]);

    const getAllProducts = () => {
        axios.get('/api/v1/products/all')
            .then((response) => {
                setAllProducts(response.data.data)
                console.log("RESPONSE: " + JSON.stringify(response.data))
            })
    }
    useEffect(() => {
        getAllProducts();

        
    }, [])
    useEffect(() => {
        console.log("EXECUTE: " + allProducts.length)
        if (allProducts.length > 0) {
            const updatedProducts = [...allProducts]
            Promise.all(
                updatedProducts.map(async (item)=>{
                    console.log("ITEM: " + JSON.stringify(item))
                    if (item.images.length>0 && !item.images[0].downloadUrl.startsWith("blob")) {
                       await axios.get(item.images[0].downloadUrl,
                            { responseType: 'blob' }
                        )
                            .then((response) => {
                                const url = URL.createObjectURL(response.data);
                                item.images[0].downloadUrl = url;
                                console.log("URL: " + url)
                            })
                    }
                })
            ).then(()=>{
                setAllProductsImg(updatedProducts);
                console.log("Products with img: " + JSON.stringify(updatedProducts))
            })
        }
    }, [allProducts])
    const removeProduct = (product) => {
        axios.delete(`/api/v1/products/product/${Number(product.id)}/delete`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((response)=>{
            setAllProductsImg(allProductsImg.filter((item)=> item.id !== product.id))
        }).catch((err)=>{
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 404) {
                setErrMsg('Product Not Found');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');

            } 
            else{
                setErrMsg('Delete failed');
                console.log("ERROR: " + err)
            }
        
        })
    }
    return (
        <div className="listProduct">
            <h1>All Products List</h1>
            <div className="listProductFormatName">
                <p>Products</p>
                <p>Name</p>
                <p>Price</p>
                <p>Category</p>
                <p>Barnd</p>
                <p>Inventory</p>
                <p>Remove</p>

            </div>
            <div className="listProductAllProducts">
                <hr></hr>
                {allProductsImg.map((product, index) => {
                    return <><div key={index} className="listProductFormatName listProductFormat">
                        <img src={product.images[0]?.downloadUrl} className="listProductProductIcon" alt="" />
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                        <p>{product.category.name}</p>
                        <p>{product.brand}</p>
                        <p>{product.inventory}</p>
                        <img onClick={()=>removeProduct(product)} src={cross_icon} className="listProductRemoveIcon" alt="" />
                    </div>
                    <hr/></>
                })}
            </div>
        </div>
    )
}

export default ListProduct;