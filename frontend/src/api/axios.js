import axios from "axios";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8081"
    : "https://printova.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const currentPath = window.location.pathname;
      console.log("Token expired. Logging out...");

      localStorage.removeItem("accessToken");

      // Only redirect if not already on /login
      if (currentPath !== "/login") {
        window.location.replace("/login"); // use replace to avoid adding history entry
      }
    }

    return Promise.reject(error);
  }
);

export default api;