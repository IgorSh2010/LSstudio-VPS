import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Підписка на auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    fetch("/api/users/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🛒 Завантажуємо кошик (з localStorage або бекенду)
  useEffect(() => {
    if (user) {
      const token = localStorage.getItem("token");
      fetch("/api/cart", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setCartItems(res.data.items || []))
        .catch((err) => {
          console.error("❌ Error loading cart:", err);
          setCartItems([]);
        });
    } else {
      // гостьовий режим — беремо з localStorage
      const stored = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(stored);
    }
  }, [user]);

  // 🧾 Зберігаємо кошик
  const saveCart = async (newItems) => {
    setCartItems(newItems);

    if (user) {
      const token = localStorage.getItem("token");
      try {
        await fetch(
          "/api/cart",
          { items: newItems },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("❌ Error saving cart:", err);
      }
    } else {
      // локальне збереження для неавторизованого
      localStorage.setItem("cart", JSON.stringify(newItems));
    }
  };

  const addToCart = (product) => {
    const exists = cartItems.find((item) => item.id === product._id);
    let updated;
    if (exists) {
      updated = cartItems.map((item) =>
        item.id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updated = [
        ...cartItems,
        {
          id: product._id,
          imageUrl: product.imageUrl || product.image, 
          title: product.title,
          price: product.price,
          quantity: 1,
        },
      ];
    }
    //setCartItems(updated);
    saveCart(updated);
  };

  const removeFromCart = (productId) => {
    const updated = cartItems.filter((item) => item.id !== productId);
    //setCartItems(updated);
    saveCart(updated);
  };

  const clearCart = () => {
    //setCartItems([]);
    saveCart([]);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  if (loading) return null;
  
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};
