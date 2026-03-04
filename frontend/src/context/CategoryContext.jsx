import { createContext, useContext } from "react";
import api from "../api/axios";
import RootDataContext from "./RootDataContext";
import handleRequest from "../api/requestHandler";

const CategoryContext = createContext(null);

export const CategoryProvider = ({ children }) => {
  const { categories, setCategories } = useContext(RootDataContext);

  const getAllCategories = async () => {
    return await handleRequest(() => api.get(`/api/category`));
  };

  const getCategoryById = async (categoryId) => {
    return await handleRequest(() => api.get(`/api/category/${categoryId}`));
  };
  
  const addCategory = async (categoryName, categoryDescription) => {
    return await handleRequest(() => api.post(`/api/category`, { categoryName, categoryDescription }));
  };

  const updateCategory = async (categoryId, categoryName, categoryDescription) => {
    return await handleRequest(() => api.put(`/api/category/${categoryId}`, { categoryName, categoryDescription }));
  };

  const removeCategory = async (categoryId) => {
    return await handleRequest(() => api.delete(`/api/category/${categoryId}`));
  };

  return (
    <CategoryContext.Provider value={{ categories, setCategories, getAllCategories, getCategoryById, addCategory, updateCategory, deleteCategory: removeCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
