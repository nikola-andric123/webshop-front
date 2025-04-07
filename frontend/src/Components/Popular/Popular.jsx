import React from "react";
import "./Popular.css";
import data_product from "../Assets/data";
import Item from "../Items/Item";
import { ShopContext } from "../../Context/ShopContext";
import { useContext, useEffect, useState } from "react";
import axios from "../../Api/axios";


const Popular = () => {
    const { popularPhones, setPopularPhones } = useContext(ShopContext);
           console.log("INSIDE USEEFECT: " + popularPhones)
    
    const [finished, setFinished] = useState(false);
    
    
    return (
        <div className="popular">
            <h1>POPULAR IN PHONES</h1>
            <hr />
            <div className="popular-item">
                {popularPhones.data && popularPhones.data.map((item, i) => {
                    
                    return (
                        
                            <Item key={i} id={item.id} image={item.images[0].downloadUrl} name={item.name}
                                new_price={item.price} />
                        
                       
                    )
                })}


            </div>
        </div>
    );
};

export default Popular;