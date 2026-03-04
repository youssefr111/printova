import { createContext, useContext } from "react";
import api from "../api/axios";
import RootDataContext from "./RootDataContext";
import handleRequest from "../api/requestHandler";

// eslint-disable-next-line react-refresh/only-export-components
export const RoleContext = createContext(null);

export const RoleProvider = ({ children }) => {
  const { roles, setRoles } = useContext(RootDataContext);

  const getRoleById = async (roleId) => {
    return await handleRequest(() => api.get(`/api/roles/${roleId}`));
  };

  const getAllRoles = async () => {
    return await handleRequest(() => api.get(`/api/roles`));
  };

  const getUserRoles = async (userId) => {
    return await handleRequest(() => api.get(`/api/roles/user/${userId}`));
  };
  
  const addUserRole = async (userId, roleName) => {
    return await handleRequest(() => api.post(`/api/roles/user/${userId}`, { roleName }));
  };

  const removeUserRole = async (userId, roleName) => {
    return await handleRequest(() => api.delete(`/api/roles/user/${userId}`, {data: { roleName }}));
  };

  return (
    <RoleContext.Provider value={{ roles, setRoles, getRoleById, getAllRoles, getUserRoles, addUserRole, removeUserRole }}>
      {children}
    </RoleContext.Provider>
  );
};