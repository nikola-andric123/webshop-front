import React from 'react';
import './Breadcrum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrum = ({product}) => {
    //const {product} = props.product;
    
    return (
        <div className="breadcrum">
            HOME <img src={arrow_icon} alt="" /> SHOP 
            <img src={arrow_icon} alt=""/> {product.category.name} 
            <img src={arrow_icon} alt="" /> {product.name}
        </div>
    );
};

export default Breadcrum;