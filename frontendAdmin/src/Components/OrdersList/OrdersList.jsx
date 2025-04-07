import React from "react";
import './OrdersList.css'
import { useState, useEffect } from "react";
import axios from "../../Api/axios";
import arrowDown_icon from '../../assets/arrow_icon.svg'


const OrdersList = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [showOk, setShowOk] = useState(false);
    const [allOrdersName, setAllOrdersName] = useState([]);

    const changeHandler = (e, order) => {
        order.orderStatus = e.target.value;
        setShowOk(true);
    }
    const changeOrderStatus = (order) => {
        axios.put('/api/v1/orders/update', order, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            console.log("RESPONSE: " + JSON.stringify(response.data));
            setShowOk(false);
        })
    }
    useEffect(() => {
        axios.get('/api/v1/orders/allOrders')
            .then((response) => {
                setAllOrders(response.data.data)
                
            })
    },[])
    useEffect(()=>{
        if (allOrders.length > 0) {
            

            const fetchUsernames = async () => {
                // Map over all orders and wait for the result of each axios call

                const updatedOrders = await Promise.all(

                    allOrders.map(async (order) => {
                        if(order.username === undefined){
                            console.log("ORDER: " + JSON.stringify(order))
                        try {
                            const response = await axios.get(`/api/v1/users/${order.userId}/user`);
                            order.username = response.data.data.email;
                            const newDate = new Date(order.orderDate[0], order.orderDate[1] - 1, order.orderDate[2])
                            
                            const formattedDate = newDate.toLocaleDateString('en-US', {
                                weekday: 'short',  // "Thu"
                                month: 'short',    // "May"
                                day: '2-digit',    // "02"
                                year: 'numeric'    // "2025"
                              });
                            order.orderDate = formattedDate;
                            return order;
                        } catch (error) {
                            console.error("Error fetching user data:", error);
                            return order; // Return order even if the request fails
                        }
                        }else{
                            return order;
                        }
                    })
                );

                // Set the updated orders with usernames
                setAllOrdersName(updatedOrders);
            };

            fetchUsernames();
        }
    },[allOrders])
    return(
        <div className="orders-list">
            <h1>Orders List</h1>
            <div className="orders-list-table">
                <p>Order ID</p>
                <p>Buyer</p>
                <p>Order Date</p>
                <p>Total Amount</p>
                <p>Status</p>
            </div>
            <div className="orders-list-table-data">
                            <hr></hr>
                            {allOrdersName.length>0 && allOrdersName.map((order, index) => {
                                return <><div key={index} className="orders-list-table orders-list-table-item">
                                    
                                    <p>{order.orderId}</p>
                                    <p>{order.username}</p>
                                    <p>{order.orderDate}</p>
                                    <p> $ {order.totalAmount} </p>
                                    <div>
                                        <select value={order.orderStatus} onChange={(e)=>{changeHandler(e,order);}} className="orders-list-select" name="orderStatus" id="orderStatus">
                                            <option value="PENDING">PENDING</option>
                                            <option value="PROCESSING">PROCESSING</option>
                                            <option value="SHIPPED">SHIPPED</option>
                                            <option value="DELIVERED">DELIVERED</option>
                                            <option value="CANCELLED">CANCELLED</option>
                                        </select>
                                        {showOk&&<button onClick={()=>changeOrderStatus(order)} className="orders-list-button">Change</button>}

                                    </div>
                                    <img onClick={()=> {setIsOpen(!isOpen); setIsRotated(!isRotated)}} src={arrowDown_icon} className={`list-product-down-icon ${isRotated ? 'rotated' : ''}`}  alt="" />

                                    
                                </div>
                                {isOpen&&<div className="orders-list orders-inner-list">
                                        <div className="orders-list-inner-table">
                                            <p>Num</p>
                                            <p>Name</p>
                                            <p>Brand</p>
                                            <p>Price</p>
                                            <p>Quantity</p>
                                            <p>Total</p>
                                        </div>
                                        {order.orderItems.map((item, index) => {
                                            return <div key={index} className="orders-list-inner-table-data">
                                                <div className="orders-list-inner-table orders-list-inner-table-item">
                                                <p>{index}</p>
                                                <p>{item.productName}</p>
                                                <p>{item.productBrand}</p>
                                                <p>{item.price}</p>
                                                <p>{item.quantity}</p>
                                                <p>{item.price*item.quantity}</p>
                                                </div>
                                            </div>
                                        })}
                                    </div>}
                                <hr/></>
                            })}
                        </div>
        </div>
    )
}

export default OrdersList;