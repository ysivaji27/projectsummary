import axios from "axios";
import { store } from "../app/store";
import { logout } from "../features/auth/authSlice";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Request interceptor (skip login/register)
api.interceptors.request.use((config) => {
  const noAuthNeeded = ["/auth/login", "/auth/register"];
  if (!noAuthNeeded.some(path => config.url.includes(path))) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor for token expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Clear auth state
      store.dispatch(logout());
      localStorage.removeItem("token");

      // Prevent further error handling
      window.location.href = "/login";
      return new Promise(() => {}); // never resolves → stops propagation
    }
    return Promise.reject(error);
  }
);

export default api;
