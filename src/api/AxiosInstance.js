import axios from "axios";
import Cookies from "js-cookie";

export const baseURL = "https://crudinvoicepostgresql.onrender.com";

export const axiosInstance = axios.create({
  // baseURL: "http://192.168.210.72:3000",
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    console.log("Bearer ", token); // Adjust key based on your storage strategy
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
