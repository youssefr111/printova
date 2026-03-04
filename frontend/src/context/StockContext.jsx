import { createContext, useContext } from "react";
import api from "../api/axios";
import RootDataContext from "./RootDataContext";
import handleRequest from "../api/requestHandler";

const StockContext = createContext(null);

export const StockProvider = ({ children }) => {
    const { stock } = useContext(RootDataContext);

    const getStockByName = (stockName) => {
      if (!stock) return null;
      return stock.find(
        (stock) =>
          stock.stockName.toLowerCase() === stockName.toLowerCase()
      );
    };

    const getAllStock = async () => {
      return await handleRequest(() => api.get(`/api/stock`));
    };

    const getStockByPartId = async (partId) => {
      return await handleRequest(() => api.get(`/api/stock/part/${partId}`));
    };

    const updatePartStock = async (partId, stockQuantity) => {
      return await handleRequest(() => api.put(`/api/stock/${partId}`, { stockQuantity }));
    };

    const adjustPartStock = async (partId, quantityChange) => {
      return await handleRequest(() => api.post(`/api/stock/${partId}/adjust`, { quantityChange }));
    };

  return (
    <StockContext.Provider value={{ stock, getStockByName, getAllStock, getStockByPartId, updatePartStock, adjustPartStock }}>
      {children}
    </StockContext.Provider>
  );
};

export default StockContext;