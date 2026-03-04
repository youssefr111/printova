import { createContext, useContext } from "react";
import api from "../api/axios";
import RootDataContext from "./RootDataContext";
import handleRequest from "../api/requestHandler";

const PaymentMethodContext = createContext(null);

export const PaymentMethodProvider = ({ children }) => {
    const { paymentMethods } = useContext(RootDataContext);

    const getAllPaymentMethods = async () => {
      return await handleRequest(() => api.get(`/api/payment-method`));
    };

    const getPaymentMethodById = async (paymentMethodId) => {
      return await handleRequest(() => api.get(`/api/payment-method/${paymentMethodId}`));
    };
    
    const addPaymentMethod = async (paymentMethodCode, paymentMethodName) => {
      return await handleRequest(() => api.post(`/api/payment-method`, { paymentMethodCode, paymentMethodName }));
    };

    const updatePaymentMethod = async (paymentMethodId, paymentMethodCode, paymentMethodName) => {
      return await handleRequest(() => api.put(`/api/payment-method/${paymentMethodId}`, { paymentMethodCode, paymentMethodName }));
    };

    const removePaymentMethod = async (paymentMethodId) => {
      return await handleRequest(() => api.delete(`/api/payment-method/${paymentMethodId}`));
    };

  return (
    <PaymentMethodContext.Provider value={{ paymentMethods, getAllPaymentMethods, getPaymentMethodById, addPaymentMethod, updatePaymentMethod, removePaymentMethod }}>
      {children}
    </PaymentMethodContext.Provider>
  );
};

export default PaymentMethodContext;