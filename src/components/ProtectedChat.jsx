import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import { getUserRole } from "../Utils/roles";

const ProtectedChat = ({ children }) => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    const checkAccess = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // 1️⃣ Отримуємо користувача
        const userRes = await fetch("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = userRes.data;

        // 2️⃣ Якщо адмін — доступ є автоматично
        if (user.role === "admin") {
          setAllowed(true);
          return;
        }

        // 3️⃣ Якщо не адмін — перевіряємо, чи це його замовлення
        const orderRes = await fetch(`/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (orderRes.data.userId === user.id) {
          setAllowed(true);
        } else {
          setAllowed(false);
        }
      } catch (err) {
        console.error("❌ Chat access error:", err);
        setAllowed(false);
      }
    };

    checkAccess();
  }, [orderId, navigate]);

  if (allowed === null) return <p className="text-center mt-20">Sprawdzanie dostępu...</p>;
  if (allowed === false) return <p className="text-center mt-20 text-red-500">Brak dostępu do tej rozmowy.</p>;

  return children;
};

export default ProtectedChat;
