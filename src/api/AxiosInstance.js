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
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("CONFIG TOKEN", config.headers.Authorization);
    }
    return config;
  },
  (error) => Promise.reject(error)
);
