import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8081",
});

// attach access token automatically
api.interceptors.request.use((config) => {
  // Prefer the standalone key, but support sessions created before it existed.
  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("accessToken") ||
    (storedUser ? JSON.parse(storedUser).accessToken : null);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
