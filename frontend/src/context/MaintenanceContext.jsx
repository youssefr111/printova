import { createContext, useState } from "react";
import api from "../api/axios";
import RootDataContext from "./RootDataContext";
import handleRequest from "../api/requestHandler";

const MaintenanceContext = createContext();

export const MaintenanceProvider = ({ children }) => {
  const [maintenances, setMaintenances] = useState([]);

  const fetchMaintenances = async () => {
    const res = await handleRequest(() => api.get("/api/maintenance"));
    if (res) setMaintenances(res);
  };

  const getMaintenanceById = async (maintenanceId) => {
    return await handleRequest(() => api.get(`/api/maintenance/${maintenanceId}`));
  };

  const createMaintenance = async (maintenanceData) => {
    const res = await handleRequest(() => api.post("/api/maintenance", maintenanceData));
    await fetchMaintenances();
    return res;
  };

  const getTechnicianMaintenances = async (status) => {
    return await handleRequest(() => api.get(`/api/maintenance/technician?status=${status || "SCHEDULED"}`));
  };

  const completeMaintenance = async (maintenanceId) => {
    return await handleRequest(() => api.patch(`/api/maintenance/technician/complete/${maintenanceId}`));
  };

  return (
    <MaintenanceContext.Provider value={{ maintenances, fetchMaintenances, getMaintenanceById, createMaintenance, getTechnicianMaintenances, completeMaintenance }}>
      {children}
    </MaintenanceContext.Provider>
  );
};

export default MaintenanceContext;