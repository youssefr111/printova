import { createContext, useContext } from "react";
import api from "../api/axios";
import RootDataContext from "./RootDataContext";
import handleRequest from "../api/requestHandler";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { orders, fetchOrders } = useContext(RootDataContext);

  const getOrderById = async (orderId) => {
    return await handleRequest(() => api.get(`/api/order/${orderId}`));
  };

  const createOrder = async (address) => {
    const res = await handleRequest(() => api.post("/api/order", { address }));
    await fetchOrders();
    return res;
  };

  const getDeliveryOrders = async (status) => {
    return await handleRequest(() => api.get(`/api/order/delivery?status=${status || "PENDING"}`));
  };

  const completeOrder = async (orderId) => {
    return await handleRequest(() => api.patch(`/api/order/delivery/complete/${orderId}`));
  };

  return (
    <OrderContext.Provider value={{ orders, getOrderById, createOrder, getDeliveryOrders, completeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;