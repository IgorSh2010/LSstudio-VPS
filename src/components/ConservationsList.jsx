import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
//import { getUserRole } from "../Utils/roles";

const ConversationsList = () => {
  const [conversations, setConversations] = useState([]);
  const [unreadPerOrder, setUnreadPerOrder] = useState({});
  //const [role, setRole] = useState("user");
  //const [user, setUser] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // 🧠 Тимчасова емул. користувача (заміниться JWT після підключення бекенду)
  const mockUser = {
    id: "user123",
    role: "user", // або "admin"
  };

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);

        // 1️⃣ Отримуємо всі замовлення
        const url =
          mockUser.role === "admin"
            ? "/api/orders"
            : `/api/orders?userId=${mockUser.id}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Błąd pobierania zamówień");
        const orders = await res.json();

        // 2️⃣ Для кожного замовлення отримуємо кількість непрочитаних повідомлень
        const unreadCounts = {};
        await Promise.all(
          orders.map(async (order) => {
            const msgRes = await fetch(`/api/orders/${order.id}/messages`);
            if (!msgRes.ok) return;
            const msgs = await msgRes.json();

            const unread = msgs.filter((m) =>
              mockUser.role === "admin"
                ? !m.readByAdmin && m.sender === "user"
                : !m.readByUser && m.sender === "admin"
            ).length;

            unreadCounts[order.id] = unread;
          })
        );

        // 3️⃣ Сортуємо — зверху ті, де є нові повідомлення
        const sorted = [...orders].sort((a, b) => {
          const unreadA = unreadCounts[a.id] || 0;
          const unreadB = unreadCounts[b.id] || 0;
          return unreadB - unreadA;
        });

        setConversations(sorted);
        setUnreadPerOrder(unreadCounts);
      } catch (err) {
        console.error("❌ Error fetching conversations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
    const interval = setInterval(fetchConversations, 5000); // автооновлення раз на 5с
    return () => clearInterval(interval);
  }, []);  

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setExpandedId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading)
    return (
      <div className="text-center text-gray-600 py-20">
        Ładowanie rozmów...
      </div>
    );

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto mt-2 p-4 bg-white/50 backdrop-blur-lg rounded shadow">
      {conversations.length === 0 ? (
        <p className="text-gray-600">Brak rozmów.</p>
      ) : (
        <ul className="space-y-3">
          {conversations.map((conv) => (
            <li key={conv.id} className="relative">
              <div
                className="flex items-center justify-between bg-pink-100 p-3 rounded shadow hover:shadow-md transition cursor-pointer"
                onClick={() => setExpandedId(expandedId === conv.id ? null : conv.id)}
              >
                <div>                  
                  <p className="font-semibold">ID zamówienia: {conv.id}</p>
                  <p className="text-sm">Status: {conv.status}</p>
                </div>
                {unreadPerOrder[conv.id]&&
                  <div className="flex items-center gap-2 space-x-2 text-red-600 animate-pulse">
                     <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                     {unreadPerOrder[conv.id]}
                  </div>}   
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  expandedId === conv.id ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-4 bg-white shadow rounded text-sm">
                  <p className="font-semibold  text-gray-600">{conv.productName || "Nieokreślony produkt"}</p>
                  <p><strong>Uwagi:</strong> {conv.notes || "-"}</p>
                  <button
                    onClick={() => navigate(`/chat/${conv.id}`)}
                    className="mt-2 bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700"
                  >
                    Przejdź do rozmowy
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConversationsList;
