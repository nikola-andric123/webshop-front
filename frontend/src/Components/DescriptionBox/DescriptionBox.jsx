import React from 'react';
import './DescriptionBox.css';

const DescriptionBox = ({product}) => {
    
    return (
        <div className="descriptionbox">
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-navbox">Description</div>
                <div className="descriptionbox-navbox fade">Reviews (122)</div>              
            </div>
            <div className="descriptionbox-content">
                <p>{product.description}</p>
              
            </div>
        </div>
    );
};

export default DescriptionBox;