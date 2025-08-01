import axios from "axios"
import { store } from "@/store"

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // or your actual API base URL
})

// Add token to every request automatically
api.interceptors.request.use(
  (config) => {
    const state = store.getState()
    const token = state.auth.accessToken

    const publicEndpoints = [
      "/books/",
    ];

    const isPublic = publicEndpoints.some((endpoint) =>
      config.url?.startsWith(endpoint)
    );
    
    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
