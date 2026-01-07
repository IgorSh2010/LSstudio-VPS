import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDownUp, Pencil } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";

const API_URL = "https://your-backend-domain.com/api";

const statusColors = {
  "Nowe": "bg-yellow-100 border-yellow-400",
  "oczekujące na opłatę": "bg-orange-100 border-orange-400",
  "opłacone, w realizacji": "bg-blue-100 border-blue-400",
  "wysłane": "bg-purple-100 border-purple-400",
  "zrealizowane": "bg-green-100 border-green-400",
  "anulowane": "bg-red-100 border-red-400",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [sortDesc, setSortDesc] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Помилка завантаження замовлень");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Помилка завантаження:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/admin/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err) {
      console.error("Помилка оновлення статусу:", err);
    }
  };

  const sortedOrders = [...orders].sort((a, b) =>
    sortDesc
      ? new Date(b.created_at) - new Date(a.created_at)
      : new Date(a.created_at) - new Date(b.created_at)
  );

  if (loading)
    return (
      <div className="text-center text-gray-600 py-20">
        Завантаження замовлень...
      </div>
    );

  return (
    <>
    <div className='ml-1'><Breadcrumbs /></div>

    <div className="max-w-6xl mx-auto mt-4 p-6 bg-white/50 backdrop-blur-md shadow-xl rounded-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-4">
        <h1 className="text-2xl font-bold text-pink-700">📦 Panel zamówień (Admin)</h1>
        <button
          onClick={() => setSortDesc(!sortDesc)}
          className="flex items-center gap-2 text-sm font-bold text-pink-700 hover:text-pink-900"
        >
          Sortuj po dacie <ArrowDownUp size={18} />
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">Brak zamówień.</p>
      ) : (
        <div className="space-y-6">
          {sortedOrders.map(order => (
            <div
              key={order.id}
              className={`p-4 shadow-md rounded-lg hover:shadow-lg transition border-l-4 flex flex-col gap-4 md:flex-row md:items-center ${statusColors[order.status] || "border-gray-300 bg-white/70"}`}
            >
              {order.imageUrl && (
                <div className="w-full md:w-32 h-32 flex-shrink-0">
                  <img
                    src={order.imageUrl}
                    alt={order.productName}
                    className="w-full h-full object-contain rounded"
                  />
                </div>
              )}

              <div className="flex-1 space-y-1 text-sm text-gray-800">
                <p><strong className="text-pink-700">📅 Data:</strong> {new Date(order.createdAt?.seconds * 1000).toLocaleString("pl-PL")}</p>
                <p><strong className="text-pink-700">🆔 ID:</strong> {order.id}</p>
                <p><strong className="text-pink-700">👤 Klient:</strong> {order.name} ({order.email})</p>
                <p><strong className="text-pink-700">📞 Nr telefonu:</strong> {order.userPhone}</p>
                <p className="break-words max-h-24 overflow-y-auto pr-2">
                  <strong className="text-pink-700">📝 Uwagi:</strong>{" "}
                  {order.notes || "-"}
                </p>
                <button
                  onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                  className="text-sm text-pink-700 hover:underline"
                >
                  {expandedId === order.id ? "Ukryj szczegóły" : "Pokaż szczegóły"}
                </button>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedId === order.id ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                  <div className="bg-white rounded border border-pink-100 shadow-inner p-2 mt-2">
                    <h4 className="text-pink-700 font-semibold mb-2">Produkty:</h4>
                    {order.products?.length > 0 ? (
                      order.products.map((prod, idx) => (
                        <div key={idx} className="flex justify-between text-sm border-b py-1">
                          <span>{prod.productName}</span>
                          <span>{prod.quantity} x {prod.price} zł = <strong>{prod.price * prod.quantity} zł</strong></span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm">🎁 {order.productName} — {order.price} zł</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full md:w-56">
                <label className="flex items-center font-semibold text-sm gap-2">
                  <Pencil size={16} className="text-pink-700" /> Status:
                </label>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, order.userId, e.target.value)}
                  className="border border-pink-300 p-2 rounded bg-white hover:bg-pink-50 transition w-full"
                >
                  <option value="Nowe">📜 Nowe</option>
                  <option value="oczekujące na opłatę">⏳ oczekujące na opłatę</option>
                  <option value="opłacone, w realizacji">📌 opłacone, w realizacji</option>
                  <option value="wysłane">🚀 wysłane</option>
                  <option value="zrealizowane">✅ zrealizowane</option>
                  <option value="anulowane">❌ anulowane</option>
                </select>

                <button
                  onClick={() => navigate(`/chat/${order.id}`)}
                  className="bg-pink-600 text-white text-sm px-3 py-2 rounded hover:bg-pink-500 transition w-full"
                >
                  Розпочати чат з клієнтом
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default AdminOrders;
