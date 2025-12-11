import { useState, useEffect, useCallback } from "react";
import API from "../api/axios";

// 🔹 Функція для декодування JWT (без бібліотек)
const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch (e) {
    return null;
  }
};

// 🔹 Головний хук
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest");
  const [loading, setLoading] = useState(true);

  // ✅ Отримання токена з localStorage
  const token = localStorage.getItem("token");

  // 🔹 Перевіряємо токен при завантаженні
  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      const decoded = parseJwt(token);
      if (!decoded || decoded.exp * 1000 < Date.now()) {
        // Токен прострочений
        localStorage.removeItem("token");
        setUser(null);
        setRole("guest");
        setLoading(false);
        return;
      }

      try {
        // 🔹 Запитуємо бекенд для перевірки
        const { data } = await API.get("/users/me");
        setUser(data);
        setRole(data.role || "user");
      } catch (err) {
        console.warn("⚠️ Токен невалідний або користувач не знайдений");
        localStorage.removeItem("token");
        setUser(null);
        setRole("guest");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  // 🔹 Логін
  const login = useCallback(async (email, password) => {
    const { data } = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    setUser(data.user);
    setRole(data.user.role);
    return data;
  }, []);

  // 🔹 Вихід
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    setRole("guest");
  }, []);

  return { user, role, loading, login, logout, isAuthenticated: !!user };
};
