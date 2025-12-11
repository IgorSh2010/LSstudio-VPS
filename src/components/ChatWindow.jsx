import { useEffect, useState, useRef } from "react";


const ChatWindow = ({ orderId, isAdmin = false }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // 👉 Емуляція поточного користувача (до інтеграції з бекендом)
  const currentUser = isAdmin ? "admin" : "user123";
  //const currentUser = auth.currentUser;

  // Fetch messages in real-time
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/chat/${orderId}`);
        if (!res.ok) throw new Error("Błąd pobierania wiadomości");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("❌ Chat fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // 🔄 Автооновлення кожні 5 секунд
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      text: newMessage,
      sender: currentUser,
      timestamp: new Date().toISOString(),
    };

    // миттєво показуємо в UI
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");

    try {
     await fetch(`/api/chat/${orderId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msg),
      });
    } catch (err) {
      console.error("❌ Chat send error:", err);
    } 
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 border-b bg-pink-100 font-bold text-pink-700">🗨️ Czat z klientem</div>

      <div className="p-4 h-72 overflow-y-auto space-y-2 bg-gray-50">
        {loading && <p className="text-gray-500 text-sm">Ładowanie wiadomości...</p>}
        {!loading &&messages.length === 0 && (
          <p className="text-gray-500 text-sm">Brak wiadomości</p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-lg max-w-[70%] ${
              msg.sender === (isAdmin ? "admin" : currentUser?.uid)
                ? "bg-pink-200 self-end ml-auto"
                : "bg-gray-200"
            }`}
          >
            <p className="text-sm">{msg.text}</p>
            <p className="text-xs text-right text-gray-500 mt-1">
              {msg.timestamp?.seconds
                ? new Date(msg.timestamp.seconds * 1000).toLocaleString()
                : ""}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="p-4 border-t flex gap-2 bg-white"
      >
        <input
          type="text"
          placeholder="Napisz wiadomość..."
          className="flex-1 border p-2 rounded"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          Wyślij
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
