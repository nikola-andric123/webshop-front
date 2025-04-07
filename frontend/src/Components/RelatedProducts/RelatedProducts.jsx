import React from 'react';
import './RelatedProducts.css';
import data_product from '../Assets/data';
import Item from '../Items/Item';
import {useEffect, useState, useContext} from 'react';
import axios from '../../Api/axios';
import { ShopContext } from '../../Context/ShopContext';

const RelatedProducts = ({product}) => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const {relatedFinished, setRelatedFinished} = useContext(ShopContext);
    const [originalRelated, setOriginalRelated] = useState([]);
    useEffect(()=>{
        async function loadData(){
            await getRelatedProducts();
        }
        loadData();
        return () => {
            if(relatedProducts){
            relatedProducts.forEach(phone => {
                URL.revokeObjectURL(phone.images[0].downloadUrl);
            });
            //setRelatedProducts(originalRelated);
        }}
    },[]);
    useEffect(()=>{
        console.log("RelatedProducts: " + JSON.stringify(relatedFinished))
        if(relatedProducts.length>0){
            const updatedRelated = [...relatedProducts];
            setOriginalRelated(relatedProducts);
                        Promise.all(
                            updatedRelated.map(async (item) => {
                                if(!item.images[0].downloadUrl.startsWith("blob")){
                                console.log("SENDING REQ");
                                await axios.get(item.images[0].downloadUrl,
                                    { responseType: 'blob' }
                                )
                                    .then((response) => {
                                        const url = URL.createObjectURL(response.data);
                                        item.images[0].downloadUrl = url;
                                        
                                        console.log("Image URL: " + url);
                                    })
                                }
                            })
                        ).then(() => {
                            // Safely update the state after all promises are resolved
                            setRelatedProducts(relatedProducts);
                            setRelatedFinished(true);
                           
                        });
        }
        return () => {
            if(relatedProducts){
            relatedProducts.forEach(phone => {
                URL.revokeObjectURL(phone.images[0].downloadUrl);
            });
            setRelatedProducts(originalRelated);
        }}
    },[relatedProducts])
    const getRelatedProducts = async ()=>{
        axios.get(`/api/v1/products/products/by/category-and-brand`,{
            params:{
                category: product.category.name,
                brand: product.brand
            }
        })
        .then((response)=>{
            
            setRelatedProducts(response.data.data);
        })
    }

    return (
        <div className="related-products">
            <h1>Related Products</h1>
            <hr />
            <div className="related-products-items">
                {relatedFinished && relatedProducts.map((item,i) => {
                    return <Item key={i} id={item.id} image={item.images[0].downloadUrl} name={item.name}
                    new_price={item.price} />
                
                })}
            </div>

        </div>
    );
};

export default RelatedProducts;