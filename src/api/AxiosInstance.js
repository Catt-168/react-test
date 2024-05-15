import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://192.168.210.72:3000",
  baseURL: "https://crudinvoicepostgresql.onrender.com",
});
