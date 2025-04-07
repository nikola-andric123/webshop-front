import React, { useState } from "react";
import './AddProduct.css'
import uploadArea from '../../assets/upload_area.svg';
import cross_icon from '../../assets/cart_cross_icon.png'
import axios from "../../Api/axios"
import Modal from 'react-modal'
import { useNavigate } from "react-router-dom";
const AddProduct = () =>{
    const [image, setImage] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: '',
        description: '',
        brand: '',
        inventory: '',
        category: "mobile",
        price: ''
    });
    const navigate = useNavigate();
    const imageHandler = (e)=>{
        const file = e.target.files[0];
        if(e.target.files[0]){
        setImage(prevImages => [...prevImages, file]);
        console.log("Images count: " + image.length)
        }
    }
    const removeImage = (img) => {
        setImage(image.filter((current) => current !==img))
    }
    const changeHandler = (e) => {
        setProductDetails({...productDetails, [e.target.name]: e.target.value})
    }
    const addProduct = async () => {
        axios.post('/api/v1/products/add',productDetails,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((response) => {
            console.log("Product ID: " + JSON.stringify(response.data))
            const formData = new FormData();
            image.forEach((img) => {
                formData.append('files', img); // 'files' is the key your backend expects for the file upload
              });
              formData.append('productId', response.data.data.id);
            axios.post('/api/v1/images/upload',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',  // Ensure the content type is set correctly
                    Authorization: `Bearer ${localStorage.getItem("token")}`,  // If authentication is required
                  },
                params: {
                    productId: response.data.data.id
                }
            })
            .then((response)=>{
                console.log("UPLOAD: " + response)
                setShowLoginModal(true);
            })
        }).catch((err)=>{
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 404) {
                setErrMsg('Product Not Found');
            } else if (err.response?.status === 401) {
                setErrMsg('Your session has expired, please log in again');
                setShowLoginModal(true)
            } 
            else{
                setErrMsg('Delete failed');
                
            }
        })
    }
    return(
        <div className="addProduct">
            <div className="addProductItemField">
                <p>Product Title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type here" />
            </div>
            <div className="addProductItemField">
                <p>Product Description</p>
                <input value={productDetails.description} onChange={changeHandler} type="text" name="description" placeholder="Type here" />
            </div>
            <div className="addProductItemField">
                <p>Product Brand</p>
                <input value={productDetails.brand} onChange={changeHandler} type="text" name="brand" placeholder="Type here" />
            </div>
            <div className="addProductItemField">
                <p>Product Inventory</p>
                <input value={productDetails.inventory} onChange={changeHandler} type="text" name="inventory" placeholder="Type here" />
            </div>
            <div className="addProductPrice">
                <div className="addProductItemField">
                    <p>Price</p>
                    <input value={productDetails.price} onChange={changeHandler} type="text" name="price"  placeholder="Type here" />

                </div>
            </div>
            <div className="addProductItemField">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className="addProductSelector">
                    <option value="mobile">Mobile</option>
                    <option value="tv">TV</option>
                    <option value="audio">Audio</option>
                    <option value="healthBeauty">Health & Beauty</option>
                    <option value="computers">Computers</option>
                    <option value="gadgets">Gadgets</option>
                    <option value="home">Home Appliances</option>

                </select>
            </div>
            <div className="addProductItemField">
                <div className="addProductImageList">
            {image.length>0 && image.map((img, index)=>{
                        return(
                            <> 
                        <img className="addProductThumbnailImage" key={index} src={URL.createObjectURL(img)} alt="" />
                        <img onClick={()=> removeImage(img)}  src={cross_icon} style={{width: "15px", height: "15px", cursor: "pointer"}} />
                        </>
                    )
                    })}
                    
                <label htmlFor="file-input">
                    
                    <img src={uploadArea} alt="" className="addProductThumbnailImage"/>
                    
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden/>
                </div>
            </div>
            <button onClick={() => addProduct()} className="addProductBtn">ADD</button>
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
                                {errMsg.length===0?(<p>Porduct added successfully</p>):
                                <p>{errMsg}</p>}
                                {errMsg.length===0?(<button className="modalButton"
                                    onClick={() => {
                                        setShowLoginModal(false);
                                        setProductDetails({
                                            name: '',
                                            description: '',
                                            brand: '',
                                            inventory: '',
                                            category: "mobile",
                                            price: ''
                                        });
                                        setImage([]);
                                    }}
                                >
                                    Close
                                </button>):(<>
                                <button className="modalButton"
                                onClick={() => {
                                    setShowLoginModal(false);
                                    setErrMsg('')
                                    navigate('/')
                                }}
                            >
                                Log in
                            </button>
                            <button onClick={()=> setShowLoginModal(false)} className="modalCancleButton">Close</button></>)}
                                
                            </div>
                        </Modal>
        </div>
    )
}

export default AddProduct;