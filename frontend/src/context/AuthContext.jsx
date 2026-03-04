import { createContext, useContext } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import RootDataContext from "./RootDataContext";
import handleRequest from "../api/requestHandler";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const { user, setUser, fetchUser } = useContext(RootDataContext);

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });
    localStorage.setItem("accessToken", res.data.accessToken);
    setUser(res.data.userDTO);
    return res;
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (err) {
      console.warn("Logout failed:", err);
    } finally {
      localStorage.removeItem("accessToken");
      setUser(null);
      navigate("/");
    }
  };

  const register = async (firstName, lastName, email, password, phone, address) => {
    return await api.post("/api/auth/register", {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
    });
  };
  const changePassword = async (oldPassword, newPassword) => {
    return await handleRequest(() => api.post("/api/auth/change-password", {
      oldPassword,
      newPassword
    }));
  };

  const getUserById = async (userId) => {
    const res = await handleRequest(() => api.get(`/api/user/${userId}`));
    return res;
  };

  const getAllUsers = async () => {
    const res = await handleRequest(() => api.get(`/api/user`));
    return res;
  };

  const updateUser = async (updatedData) => {
    const res = await handleRequest(() => api.put(`/api/user/${user.id}`, updatedData));
    fetchUser();
    return res;
  };

  const hasRole = (roleName) => user?.roles?.some(role => role.roleName === roleName);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, changePassword, hasRole, getUserById, getAllUsers, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
