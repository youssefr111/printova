import { createContext, useState } from "react";
import api from "../api/axios";
import RootDataContext from "./RootDataContext";
import handleRequest from "../api/requestHandler";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const res = await handleRequest(() => api.get("/api/cart"));
    if (res) setCart(res);
  };

  const getCart = async () => {
    const res = await handleRequest(() => api.get("/api/cart"));
    return res;
  };

  const addToCart = async (partId) => {
    const res = await handleRequest(() => api.post("/api/cart", { partId, quantity: 1 }));
    fetchCart();
    return res;
  };

  const updateCartItemQuantity = async (partId, quantity) => {
    try {
      await handleRequest(() => api.put(`/api/cart/item/${partId}`, { quantity }));
      await fetchCart();
    } catch (err) {
      console.error("Failed to update quantity", err);
      alert("Failed to update quantity. Please try again.");
    }
  };

  const removeCartItem = async (partId) => {
    const res = await handleRequest(() => api.delete(`/api/cart/item/${partId}`));
    fetchCart();
    return res;
  };

  const clearCart = async () => {
    const res = await handleRequest(() => api.delete(`/api/cart/clear`));
    fetchCart();
    return res;
  };
  

  return (
    <CartContext.Provider value={{ cart, fetchCart, getCart, addToCart, updateCartItemQuantity, removeCartItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;