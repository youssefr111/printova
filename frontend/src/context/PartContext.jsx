import { createContext, useContext } from "react";
import api from "../api/axios";
import handleRequest from "../api/requestHandler";
import RootDataContext from "./RootDataContext";

const PartContext = createContext(null);

export const PartProvider = ({ children }) => {
    const { parts } = useContext(RootDataContext);

    const getAllParts = async () => {
      return await handleRequest(() => api.get(`/api/part`));
    };

    const getPartById = async (partId) => {
      return await handleRequest(() => api.get(`/api/part/${partId}`));
    };
    
    const addPart = async (partName, partDescription, categoryId, supplierId, initialPrice) => {
      return await handleRequest(() => api.post(`/api/part`, { partName, partDescription, categoryId, supplierId, initialPrice }));
    };

    const updatePart = async (partId, partName, partDescription, categoryId, supplierId) => {
      return await handleRequest(() => api.put(`/api/part/${partId}`, { partName, partDescription, categoryId, supplierId }));
    };

    const removePart = async (partId) => {
      return await handleRequest(() => api.delete(`/api/part/${partId}`));
    };

  return (
    <PartContext.Provider value={{ parts, getAllParts, getPartById, addPart, updatePart, removePart }}>
      {children}
    </PartContext.Provider>
  );
};

export default PartContext;
