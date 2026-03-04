import { createContext, useContext } from "react";
import api from "../api/axios";
import RootDataContext from "./RootDataContext";
import handleRequest from "../api/requestHandler";

const PartPriceContext = createContext(null);

export const PartPriceProvider = ({ children }) => {
    const { partPrices } = useContext(RootDataContext);

    const getPartPriceByName = (partPriceName) => {
      if (!partPrices) return null;
      return partPrices.find(
        (partPrice) =>
          partPrice.partPriceName.toLowerCase() === partPriceName.toLowerCase()
      );
    };

    const getAllPrices = async () => {
      return await handleRequest(() => api.get(`/api/part-price`));
    };

    const getPartPrices = async (partId) => {
      return await handleRequest(() => api.get(`/api/part-price/part/${partId}`));
    };
    
    const getLatestPartPrice = async (partId) => {
      return await handleRequest(() => api.get(`/api/part-price/part/${partId}/latest`));
    };

    const addPartPrice = async (partId, price) => { 
      return await handleRequest(() => api.post(`/api/part-price`, { partId, price }));
    };

  return (
    <PartPriceContext.Provider value={{ partPrices, getPartPriceByName, getAllPrices, getPartPrices, getLatestPartPrice, addPartPrice }}>

      {children}
    </PartPriceContext.Provider>
  );
};

export default PartPriceContext;