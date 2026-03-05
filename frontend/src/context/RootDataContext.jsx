import { createContext, useState, useEffect } from "react";
import api from "../api/axios";
import Loading from "../components/General/Loading";

const RootDataContext = createContext(null);

export const RootDataProvider = ({ children }) => {

  const [categories, setCategories] = useState(null);
  const [parts, setParts] = useState([]);


  // ---------- PUBLIC ----------
  const fetchParts = async () => {
    const res = await api.get("/api/part");
    setParts(res.data);
  };

  const fetchCategories = async () => {
    const res = await api.get("/api/category");
    setCategories(res.data);
  };

  useEffect(() => {
    (async () => {
      await fetchCategories();
      await fetchParts();
    })();
  }, []);

  return (
    <RootDataContext.Provider
      value={{
        categories,
        setCategories,
        parts,
        setParts,
        fetchCategories,
        fetchParts,
      }}
    >
      {children}
    </RootDataContext.Provider>
  );
};

export default RootDataContext;