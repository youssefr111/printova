import { createContext, useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import Loading from "../components/General/Loading";

const RootDataContext = createContext(null);

export const RootDataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState(null);
  const [parts, setParts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [userRes, categoriesRes, partsRes, cartRes, ordersRes, maintenancesRes] =
        await Promise.all([
          api.get("/api/auth/me"),
          api.get("/api/category"),
          api.get("/api/part"),
          api.get("/api/cart"),
          api.get("/api/order"),
          api.get("/api/maintenance"),
        ]);

      setUser(userRes.data);
      setCategories(categoriesRes.data);
      setParts(partsRes.data);
      setCart(cartRes.data);
      setOrders(ordersRes.data);
      setMaintenances(maintenancesRes.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
        const res = await api.get("/api/auth/me");
        setUser(res.data);
    } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
    }
  };

  const fetchParts = async () => {
    const res = await api.get("/api/part");
    setParts(res.data);
  };

  const fetchCart = async () => {
    const res = await api.get("/api/cart");

    setCart(prevCart => {
      // If no previous cart, just set the server response
      if (!prevCart || !prevCart.items) return res.data;

      // Create a map of server items for quick lookup
      const serverItemsMap = new Map(res.data.items.map(i => [i.partId, i]));

      // Preserve previous order of items
      const orderedItems = prevCart.items
        .map(item => serverItemsMap.get(item.partId))
        .filter(Boolean); // remove items that no longer exist

      // Add any new items from server at the end
      const newItems = res.data.items.filter(i => !prevCart.items.find(pi => pi.partId === i.partId));

      return {
        ...res.data,
        items: [...orderedItems, ...newItems],
      };
    });
  };

  const fetchOrders = async () => {
    const res = await api.get("/api/order");
    setOrders(res.data);
  };

  const fetchCategories = async () => {
    const res = await api.get("/api/category");
    setCategories(res.data);
  };

  const fetchMaintenances = async () => {
    const res = await api.get("/api/maintenance");
    setMaintenances(res.data);
  };

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  if (loading) return <Loading />;

  return (
    <RootDataContext.Provider
      value={{
        user,
        setUser,
        categories,
        setCategories,
        parts,
        setParts,
        cart,
        setCart,
        orders,
        setOrders,
        maintenances,
        setMaintenances,
        error,
        refetchAll: fetchAllData,
        fetchUser,
        fetchCategories,
        fetchParts,
        fetchCart,
        fetchOrders,
        fetchMaintenances,
      }}
    >
      {children}
    </RootDataContext.Provider>
  );
};

export default RootDataContext;