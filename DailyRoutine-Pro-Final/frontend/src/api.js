import axios from "axios";

const api = axios.create({
  baseURL: "https://dailyroutine-backend-txyc.onrender.com/api",
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("dr_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;