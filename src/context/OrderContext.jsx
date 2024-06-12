import React from 'react'
import API from "../api/axios.config";
import WithAxios from "../helpers/WithAxios";
import { createContext, useContext, useEffect, useState } from "react";
import orderService from '../services/order.service';

const OrderContext = createContext();

const OrderProvider = ({children}) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState(null);
    // const [orderStatus, setOrderStatus] = useState();


    const updateStatus = (data) => {
      // console.log(data);
      orderService.updateOrderStatus(data).then((response) => {
        setOrder(response.data);
      })
    }


    useEffect(() => {
        setLoading(true);
        orderService.getAll(page).then((response) => {
            setOrders(response.data);
            setLoading(false);
        });
    },[page])

    // console.log(orders);

  return (
    <OrderContext.Provider
    value={{
      orders, 
      setOrders, 
      loading, 
      setLoading, 
      page, 
      setPage, 
      updateStatus, 
      order
    }}
>
    <WithAxios>{children}</WithAxios>
</OrderContext.Provider>
  )
}

const useOrder = () => {
    const context = useContext(OrderContext);

    if (context === undefined) {
        throw new Error("useUser must be used within OrderProvider");
    }
    return context;
};


export {OrderProvider, useOrder};