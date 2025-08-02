import axios from "axios";
import { tryRefreshToken } from "@/features/auth/authApi";
import { getAccessToken } from "@/features/auth/authUtils";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

function getPathFromUrl(fullUrl: string): string {
  try {
    const baseURL = window.location.origin; 
    return new URL(fullUrl, baseURL).pathname;
  } catch {
    return fullUrl;
  }
}

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken()

    const publicEndpoints = [
      "/books/",
    ];

    const urlPath = getPathFromUrl(config.url || "");
    const isPublic = publicEndpoints.some(publicPath => publicPath === urlPath);
    
    if (token && !isPublic && config.url) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await tryRefreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
