import React from 'react';
import './Footer.css';
import footerLogo from '../Assets/logo_big.png';
import instagramIcon from '../Assets/instagram_icon.png';
import pinterestIcon from '../Assets/pintester_icon.png';
import whatsUpIcon from '../Assets/whatsapp_icon.png';


const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <img src={footerLogo} alt="" />
                <p>SHOPPER</p>
            </div>
            <ul className="footer-list">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <img src={instagramIcon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={whatsUpIcon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={pinterestIcon} alt="" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>© 2023 by SHOPPER. Proudly created with React</p>
            </div>
        </div>
    );
};

export default Footer;