import React from 'react';
import './Hero.css';
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/data/watches/boAt Cosmos Pro 1.webp';
import {useContext} from 'react';
import { ShopContext } from '../../Context/ShopContext';

const Hero = () => {
    const {targetRef} = useContext(ShopContext)
    const handleScroll = () => {
        // This will scroll smoothly to the element referenced by targetRef
        targetRef.current.scrollIntoView({ behavior: 'smooth' });
      };
    return (
        <div className="hero">
            <div className="hero-left">
                <h2>Latest From Tech</h2>
                <div>
                    <div className="hero-hand-icon">
                        <p>new</p>
                        <img src={hand_icon} alt="" />
                    </div>
                    <p>gadgets</p>
                    <p>at your disposal</p>
                </div>
                <div className="hero-latest-btn" onClick={handleScroll}>
                    
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt="" />
                    
                </div>    
            </div>
            <div className="hero-right">
                <img src={hero_image} alt="" />
            </div>
        </div>
    );
};

export default Hero;