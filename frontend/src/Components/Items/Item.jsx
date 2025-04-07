import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";

const Item = (props) => {
    return (
        <div className="item">
            <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Link>
            <hr className="itemHr" style={{width: "50%", height: "2px", marginTop: "10px"}}/>
            <p>{props.name}</p>
            <div className="item-prices">
                <div className="item-price-new">
                    ${props.new_price}
                </div>
                
            </div>
        </div>
    );
};

export default Item;

