import React, { useContext } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import { useEffect, useState } from "react";
import axios from "../Api/axios";
import Item from "../Components/Items/Item";

const ShopCategory = (props) => {
    const [products, setProducts] = useState([]);
    const [productsImg, setProductsImg] = useState([]);
    useEffect(() => {
        axios.get(`/api/v1/products/product/${props.category}/all/products`)
            .then((res) => {
                if (res) {
                    setProducts(res.data.data);
                    console.log("Products: " + JSON.stringify(res))
                } else {
                    setProducts([]);
                }
            })
    }, []);
    useEffect(() => {
        if(products){
        Promise.all(
            products.map(async (item) => {
                
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
           setProductsImg(products)

        });
    }
    }, [products]);

    
    return (
        <div className="shop-category">
            <img className="shopCategory-banner" src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className="shopCategory-sort">
                    Sort by: <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="shopcategory-products">
                {productsImg && productsImg.map((product, i) => {
                    return <Item key={i} id={product.id} image={product.images[0].downloadUrl} name={product.name}
                        new_price={product.price} />
                })}
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    );
};

export default ShopCategory;