import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
    const { allProducts } = useContext(ShopContext);
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    
    useEffect(() => {
        console.log("ALL PRODUCTS: " + JSON.stringify(allProducts))
        setProduct(allProducts.find((product) => product.id === Number(productId)));
    }, [allProducts])
    return (
        <div>
            {product && (
                <>
                    <Breadcrum product={product} />
                    <ProductDisplay product={product} />
                    <DescriptionBox product={product}/>
                    <RelatedProducts product={product} />
                </>
            )}

        </div>
    );
};

export default Product;