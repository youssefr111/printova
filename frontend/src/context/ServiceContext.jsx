import { createContext, useState } from "react";
import api from "../api/axios";
import RootDataContext from "./RootDataContext";
import handleRequest from "../api/requestHandler";

const ServiceContext = createContext(null);

export const ServiceProvider = ({ children }) => {
    const [services, setServices] = useState([]);

    const fetchServices = async () => {
      const res = await handleRequest(() => api.get("/api/service"));
      if (res) setServices(res);
    };

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
    <ServiceContext.Provider value={{ services, fetchServices, getServiceByName, getAllServices, getServiceById, addService, updateService, removeService }}>
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceContext;