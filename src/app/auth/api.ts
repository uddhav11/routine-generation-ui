import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Add Access Token Automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto Refresh Token on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");
      if (!refresh) {
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${API_BASE}/auth/token/refresh/`, {
          refresh,
        });

        const newAccess = res.data.access;
        localStorage.setItem("access", newAccess);

        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
