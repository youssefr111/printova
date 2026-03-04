import { createContext, useContext } from "react";
import api from "../api/axios";
import RootDataContext from "./RootDataContext";
import handleRequest from "../api/requestHandler";

const ServiceContext = createContext(null);

export const ServiceProvider = ({ children }) => {
    const { services } = useContext(RootDataContext);

    const getServiceByName = (serviceName) => {
      if (!services) return null;
      return services.find(
        (service) =>
          service.serviceName.toLowerCase() === serviceName.toLowerCase()
      );
    };

    const getAllServices = async () => {
      return await handleRequest(() => api.get(`/api/service`));
    };

    const getServiceById = async (serviceId) => {
      return await handleRequest(() => api.get(`/api/service/${serviceId}`));
    };
    
    const addService = async (serviceName, servicePrice) => {
      return await handleRequest(() => api.post(`/api/service`, { serviceName, servicePrice }));
    };

    const updateService = async (serviceId, serviceName, servicePrice) => {
      return await handleRequest(() => api.put(`/api/service/${serviceId}`, { serviceName, servicePrice }));
    };

    const removeService = async (serviceId) => {
      return await handleRequest(() => api.delete(`/api/service/${serviceId}`));
    };

  return (
    <ServiceContext.Provider value={{ services, getServiceByName, getAllServices, getServiceById, addService, updateService, removeService }}>
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceContext;