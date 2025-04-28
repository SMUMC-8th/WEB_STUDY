import axios from "axios";

export const umcServer = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER}`,
  timeout: 1000,
  headers: { accept: "application/json" },
});
