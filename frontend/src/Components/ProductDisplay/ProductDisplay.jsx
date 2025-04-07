import React, { useContext, useEffect, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import cross_icon from '../Assets/cart_cross_icon.png';
import axios from '../../Api/axios';
import Modal from 'react-modal';
import AuthContext from '../../Context/AuthProvider';



const ProductDisplay = ({ product }) => {
    const { productImages, setProductImages } = useContext(ShopContext);
    const {auth, setAuth} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const { selectedImage, setSelectedImage } = useContext(ShopContext);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const addToCart = useContext(ShopContext).addToCart;
    const { displayFinished, setDisplayFinished } = useContext(ShopContext);
    const navigate = useNavigate();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const handleColor = (index) => {
        setSelectedIndex(index);
    };
    useEffect(() => {
        console.log("DISPLAY FINISHED: " + JSON.stringify(displayFinished))
        console.log("PRODUCT IMAGES: " + JSON.stringify(productImages))
        //if(!displayFinished){
        //setSelectedImage(product.images[0].downloadUrl);
        const updatedDisplay = [...product.images]

        Promise.all(
            updatedDisplay.map(async (item) => {
                if (!item.downloadUrl.startsWith("blob")) {
                    await axios.get(item.downloadUrl,
                        { responseType: 'blob' }
                    )
                        .then((response) => {
                            const url = URL.createObjectURL(response.data);
                            item.downloadUrl = url;

                        })
                }
            })
        ).then(() => {
            // Safely update the state after all promises are resolved
            setSelectedImage(updatedDisplay[0].downloadUrl);
            setProductImages(updatedDisplay);
            setDisplayFinished(true);
        });
        //}

    }, [])
    useEffect(() => {
        setLoading(false);
    }, [productImages]);

    const handleAddToCart = (productId) => {
        
        addToCart(productId).then((res)=>{
            console.log("Auth: " + JSON.stringify(res))
                if (!res) {
                    // User is not authenticated; show login modal
                    console.log("Set modal: " + JSON.stringify(res))
                    setShowLoginModal(true);
                    //navigate("/login")
                   
                }       
        })
        
    };

    const switchImage = (url) => {
        setSelectedImage(url);
    }
    const colors = ["blue", "gold", "#57acd4", "#cf2740"];
    return (
        <div className="productDisplay">
            <div className="productDisplay-left">
                <div className="productDisplay-img-list">
                    {loading ? (<p>Loading...</p>) :

                        productImages.map((image) => {

                            return <div onClick={() => switchImage(image.downloadUrl)} className="grid-item"><img src={image.downloadUrl} alt="" /></div>

                        })}

                </div>
                <div className="productDisplay-img">
                    {product.images.length > 0 && (
                        <img className="productDisplay-main-img" src={selectedImage} alt="" />
                    )}
                    {product.images.length === 0 && (
                        <img className="productDisplay-main-img" src={cross_icon} alt="" />
                    )}
                </div>
            </div>
            <div className="productDisplay-right">
                <h1>{product.name}</h1>
                <div className="productDisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productDisplay-right-prices">

                    <div className="productDisplay-right-price-new">
                        ${product.price}
                    </div>
                </div>
                <div className="productDisplay-right-description">
                    {product.description}
                </div>
                <div className="productDisplay-right-size">
                    <h1>Select Color</h1>
                    <div className="productDisplay-right-sizes">
                        {colors.map((color, index) => (

                            <div key={index} className="productDisplay-right-size-item" style={{
                                background: color,

                                border: selectedIndex === index ? "4px solid black" : "1px solid black"
                            }}
                                onClick={() => handleColor(index)}></div>

                        ))}

                    </div>
                    <button onClick={() => { handleAddToCart(product.id) }}>Add to Cart</button>
                    {showLoginModal && (
                        <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}
                        style={{content: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: 'rgba(100, 100, 111, 0.3) 0px 7px 29px 0px',
                            backgroundColor: 'white',
                            border: '2px solid rgb(240, 240, 240)',
                            borderRadius: '12px',
                            position: 'absolute',
                            height: 'fit-content',
                            width: '300px',
                            top: '120px',
                            left: 'calc(50% - 150px)'
                          }}}>
                            <div style={{ padding: "10px", textAlign: "center"  }}>
                                <p>You must be logged in to add items to the cart.</p>
                                <button className="modalButton"
                                    onClick={() => {
                                        setShowLoginModal(false);
                                        navigate("/login");
                                    }}
                                >
                                    Log In
                                </button>
                                <button className="modalCancleButton"
                                    onClick={() => {
                                        setShowLoginModal(false);
                                        
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </Modal>
                    )}
                    <p className="productDisplay-right-category"><span>Category:</span> {product.category.name}</p>

                </div>
            </div>
        </div>
    );
};

export default ProductDisplay;