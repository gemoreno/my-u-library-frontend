import axios from "axios";
import { tryRefreshToken } from "@/features/auth/authApi";
import { getAccessToken } from "@/features/auth/authUtils";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken()

    const publicEndpoints = [
      "/books/",
    ];

    const isPublic = publicEndpoints.some((endpoint) =>
      config.url?.startsWith(endpoint)
    );
    
    if (token && !isPublic && config.url && !config.url.startsWith("/token")) {
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
