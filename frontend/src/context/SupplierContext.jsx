import { createContext, useContext } from "react";
import api from "../api/axios";
import RootDataContext from "./RootDataContext";
import handleRequest from "../api/requestHandler";

const SupplierContext = createContext(null);

export const SupplierProvider = ({ children }) => {
  const { suppliers, setSuppliers } = useContext(RootDataContext);

  const getAllSuppliers = async () => {
    return await handleRequest(() => api.get(`/api/supplier`));
  };

  const getSupplierById = async (supplierId) => {
    return await handleRequest(() => api.get(`/api/supplier/${supplierId}`));
  };
  
  const addSupplier = async (supplierName, supplierEmail, supplierPhone) => {
    return await handleRequest(() => api.post(`/api/supplier`, { supplierName, supplierEmail, supplierPhone }));
  };

  const updateSupplier = async (supplierId, supplierName, supplierEmail, supplierPhone) => {
    return await handleRequest(() => api.put(`/api/supplier/${supplierId}`, { supplierName, supplierEmail, supplierPhone }));
  };

  const removeSupplier = async (supplierId) => {
    return await handleRequest(() => api.delete(`/api/supplier/${supplierId}`));
  };

  return (
    <SupplierContext.Provider value={{ suppliers, setSuppliers, getAllSuppliers, getSupplierById, addSupplier, updateSupplier, deleteSupplier: removeSupplier }}>
      {children}
    </SupplierContext.Provider>
  );
};

export default SupplierContext;
