import axios from "axios";

console.log("✅ VITE_SERVER_API_URL:", import.meta.env.VITE_SERVER_API_URL);
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: false,
});
