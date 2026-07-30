import axios from "axios";

const DEFAULT_API_URL = "http://localhost:5000/api";

export const API_URL = (
  import.meta.env.VITE_API_URL || DEFAULT_API_URL
).replace(/\/+$/, "");

export const API_ORIGIN = API_URL.replace(/\/api$/, "");

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("customerToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
