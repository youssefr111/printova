import { createContext, useContext } from "react";
import api from "../api/axios";
import handleRequest from "../api/requestHandler";
import RootDataContext from "./RootDataContext";

const PaymentContext = createContext(null);

export const PaymentProvider = ({ children }) => {
    const { payments } = useContext(RootDataContext);

    const getAllPayments = async () => {
      return await handleRequest(() => api.get(`/api/payment`));
    };

    const getPaymentById = async (paymentId) => {
      return await handleRequest(() => api.get(`/api/payment/${paymentId}`));
    };
    
  return (
    <PaymentContext.Provider value={{ payments, getAllPayments, getPaymentById }}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentContext;
