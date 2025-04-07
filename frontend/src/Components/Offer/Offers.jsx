import React from 'react';
import './Offers.css';
import exclusive_image from '../Assets/exclusive_image.png';
import latest_image from '../Assets/data/airpodes/boAt Airdopes 111 1.webp'

const Offers = () => {
    return (
        <div className="offers">
            <div className="offers-left">
                <h1>New releases</h1>
                <h1>from the tech world</h1>
                <p>ONLY ON BEST SELLERS PRODUCT</p>
                <button>Check Now</button>
            </div>
            <div className="offers-right">
                <img src={latest_image} alt="" />
            </div>
        </div>
    );
};

export default Offers;