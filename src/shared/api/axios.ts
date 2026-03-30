import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.DEV ? "/api" : "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("auth-storage") ||
    sessionStorage.getItem("auth-storage");

  if (token) {
    try {
      const parsed = JSON.parse(token);
      const accessToken = parsed?.state?.accessToken;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch {
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth-storage");
      sessionStorage.removeItem("auth-storage");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
