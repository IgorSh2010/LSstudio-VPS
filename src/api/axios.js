import axios from "axios";

const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const API_URL = isLocalhost
  ? "http://129.159.28.206:5000/api"  // ← твій бекенд
  : "/api";                       // ← продакшн через проксі

//const API_URL = "https://129.159.28.206/api";
//const API_URL = "/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const raw = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// === Interceptor для access token ===
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// === Interceptor для refresh token ===
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Якщо токен прострочений (401) і ще не оновлювали
    if (error.response?.status === 401 && !originalRequest._retry) 
      {        
        originalRequest._retry = true;
        try {
          const { data } = await raw.post(`/auth/refresh-token`, {}, { withCredentials: true });
          
          localStorage.setItem("token", data.token);
          // Повторити запит із новим токеном
          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          return api(originalRequest);
        } catch (err) {
          console.error("Refresh token error:", err);
          localStorage.clear();
          window.location.href = "/"; // Перенаправлення на сторінку входу
        }
      }

    return Promise.reject(error);
  }
);

// === Interceptor для обробки помилки з бекенду ===
api.interceptors.response.use(
    (res) => res,
    (err) => {
      const msg =
        err.response?.data?.error?.message ??
        "Wystąpił nieoczekiwany błąd";

      return Promise.reject(msg);
    }
);

export default api;