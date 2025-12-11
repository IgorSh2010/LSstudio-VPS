import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
//import { getUserRole } from "../Utils/roles";

const ConversationsDetails = () => {
  const { orderId } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [role, setRole] = useState("user");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);
  
  // 🧠 Емуляція користувача (тимчасово, поки не буде бекенд-автентифікації)
  const mockUser = {
    id: "user123",
    role: "user",
  };

  useEffect(() => {
    //if (!user) return;

    const fetchOrderAndMessages = async () => {
      try {
        setLoading(true);

        // 1️⃣ Завантажуємо замовлення
        const orderRes = await fetch(`/api/orders/${orderId}`);
        if (!orderRes.ok) throw new Error("Nie udało się pobrać zamówienia.");
        const orderData = await orderRes.json();
        setOrder(orderData);

        // 2️⃣ Визначаємо роль
        const userRole = mockUser.role; // замінити на бекенд-запит
        setRole(userRole);

        // 3️⃣ Завантажуємо повідомлення
        const msgRes = await fetch(`/api/orders/${orderId}/messages`);
        if (!msgRes.ok) throw new Error("Nie udało się pobrać wiadomości.");
        const msgs = await msgRes.json();
        msgs.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        setMessages(msgs);
      } catch (err) {
        console.error("❌ Chat fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderAndMessages();

    // 🔄 Автооновлення чату кожні 5 секунд
    const interval = setInterval(fetchOrderAndMessages, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!messageText.trim()) return;

    const newMsg = {
      text: messageText.trim(),
      sender: role,
      createdAt: new Date().toISOString(),
      readByUser: role === "user",
      readByAdmin: role === "admin",
    };

    // миттєво показуємо на екрані
    setMessages((prev) => [...prev, newMsg]);
    setMessageText("");

    try {
      await fetch(`/api/orders/${orderId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMsg),
      });
    } catch (err) {
      console.error("❌ Send message error:", err);
    }
  };

  if (loading) return <p className="p-6 text-center">Ładowanie...</p>;
  if (!order) return <p className="p-6 text-center">Brak danych zamówienia.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-20 p-4 bg-white/50 backdrop-blur-lg rounded shadow flex flex-col h-[70vh]">
      <h1 className="text-xl font-bold text-pink-700 mb-2">Rozmowa o zamówieniu: {order.productName}</h1>

      <div className="flex-1 overflow-y-auto space-y-2 p-2 bg-white rounded shadow-inner">
        {messages.length === 0 && (
          <p className="text-sm text-gray-500 text-center mt-2">
            Brak wiadomości.
          </p>
        )}
        
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs p-2 rounded ${
              msg.sender === role ? "bg-pink-200 self-end" : "bg-gray-200 self-start"
            }`}
          >
            <p className="text-sm">{msg.text}</p>
            <p className="text-[10px] text-right text-gray-500">
              {new Date(msg.createdAt).toLocaleString("pl-PL")}
            </p>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <div className="flex mt-4">
        <input
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border p-2 rounded-l focus:outline-pink-500"
          placeholder="Napisz wiadomość..."
        />
        <button
          onClick={sendMessage}
          className="bg-pink-600 text-white px-4 rounded-r hover:bg-pink-700"
        >
          Wyślij
        </button>
      </div>
    </div>
  );
};

export default ConversationsDetails;
