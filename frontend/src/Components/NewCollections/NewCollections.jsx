import React from 'react';
import './NewCollections.css';
import new_collections from '../Assets/new_collections';
import Item from '../Items/Item';
import { ShopContext } from '../../Context/ShopContext';
import {useContext, useState, useEffect} from 'react';
import cross_icon from '../Assets/cart_cross_icon.png';
import axios from '../../Api/axios';
import jsxDevRuntime from 'react/jsx-dev-runtime';

const NewCollections = () => {
    const {allProducts} = useContext(ShopContext);
    const {targetRef} = useContext(ShopContext);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortedProductsImg, setSortedProductsImg] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {newCollectionFinished, setNewCollectionFinished} = useContext(ShopContext);
    useEffect(()=>{
        const sorted = [...allProducts].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
        setSortedProducts(sorted.slice(0,10));
        
    },[allProducts])
    useEffect(() => {
        
       console.log("New collection finished: " + JSON.stringify(newCollectionFinished));
        if(sortedProducts.length>0){
            
            Promise.all(
                sortedProducts.map(async (item) => {
                setOriginalProducts(sortedProducts);
                if(item.images.length>0){
                if(!item?.images[0]?.downloadUrl.startsWith("blob")){
                    await axios.get(item?.images[0]?.downloadUrl,
                        { responseType: 'blob' }
                    )
                        .then((response) => {
                            const url = URL.createObjectURL(response.data);
                            item.images[0].downloadUrl = url;
    
                        })
                }
            }
                })
            
            ).then(() => {
                // Safely update the state after all promises are resolved
                setSortedProductsImg(sortedProducts);
            });
        }
        
        }, [sortedProducts])
        useEffect(()=>{
            
            if(sortedProducts.length>0){
                setLoading(false)
            }
        },[sortedProducts])
    return (
        <div ref={targetRef} className="new-collections">
            <h1>New Releases</h1>
            <hr />
            <div className="collections">
                {loading? (
                    <p>Loading...</p>
                ):
                sortedProductsImg.map((item,i) => {
                    if(item.images.length>0)
                    return <Item key={i} id={item.id} image={item.images[0].downloadUrl} name={item.name}
                    new_price={item.price} />
                    else 
                    return <Item key={i} id={item.id} image={cross_icon} name={item.name}
                    new_price={item.price} />
                })}
            </div>
        </div>
    );
};

export default NewCollections;