import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    Authorization:
      "Bearer " +
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.accessToken) as string),
  },
});
