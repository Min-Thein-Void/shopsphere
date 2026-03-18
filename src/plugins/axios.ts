import axios, { AxiosInstance } from "axios";

// Create a simple axios instance
const api : AxiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default api;
