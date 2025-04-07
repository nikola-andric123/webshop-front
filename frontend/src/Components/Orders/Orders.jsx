import React from "react";
import { useState, useEffect } from "react";
import axios from "../../Api/axios";
import arrowDown_icon from "../../Components/Assets/dropdown_icon.png";
import "./Orders.css";

const Orders = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try{
                const response = await axios.get(`/api/v1/orders/${localStorage.getItem("userId")}/orders`)
                
                setAllOrders(response.data.data);
                response.data.data.map((order) => {
                    console.log("Order: " + JSON.stringify(order))
                    order.orderItems.map(async (item) => {
                        const product = await axios.get(`/api/v1/products/product/${item.productId}/product`);
                        console.log("Product: " + JSON.stringify(product))
                        
                        const imgUrl = await axios.get(product.data.data.images[0].downloadUrl,
                            { responseType: 'blob' }
                        )
                           
                        const url = URL.createObjectURL(imgUrl.data);
                        console.log("Image URL: " + url)
                        product.data.data.images[0].downloadUrl = url;
                        
                        item.productImg = product.data.data.images[0].downloadUrl;
                    })
                })
            }catch(err){
                console.log("Error fetching orders: ", err)
            }
        }
        fetchOrders();
    },[])
    return (
        <div className="orders-list">
            <h1>Orders List</h1>
            <div className="orders-list-table">
                <p>OrderID</p>
                <p>Order Date</p>
                <p>Total Amount</p>
                <p>Number of items</p>
                <p>Status</p>
            </div>
            <div className="orders-list-table-data">
                            <hr></hr>
                            {allOrders.length>0 && allOrders.map((order, index) => {
                                return <><div key={index} className="orders-list-table orders-list-table-item">
                                    
                                    <p>{order.orderId}</p>
                                    <p>{order.orderDate}</p>
                                    <p> $ {order.totalAmount} </p>
                                    <p>{order.orderItems.length}</p>
                                    <p>{order.orderStatus}</p>
                                    <img onClick={()=> {setIsOpen(!isOpen); setIsRotated(!isRotated)}} src={arrowDown_icon} className={`list-product-down-icon ${isRotated ? 'rotated' : ''}`}  alt="" />

                                    
                                </div>
                                {isOpen&&<div className="orders-list orders-inner-list">
                                        <div className="orders-list-inner-table">
                                            <p>Item</p>
                                            <p>Name</p>
                                            <p>Brand</p>
                                            <p>Price</p>
                                            <p>Quantity</p>
                                            <p>Total</p>
                                        </div>
                                        {order.orderItems.map((item, index) => {
                                            return <div key={index} className="orders-list-inner-table-data">
                                                <div className="orders-list-inner-table orders-list-inner-table-item">
                                                <img className="order-item-img" src={item.productImg} />
                                                <p>{item.productName}</p>
                                                <p>{item.productBrand}</p>
                                                <p>$ {item.price}</p>
                                                <p>{item.quantity}</p>
                                                <p>$ {item.price*item.quantity}</p>
                                                </div>
                                            </div>
                                        })}
                                    </div>}
                                <hr/></>
                            })}
                        </div>
        </div>
    );
}

export default Orders;