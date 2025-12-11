
/**
 * Створює нове замовлення через бекенд.
 * @param {Object} orderData — дані з форми (name, email, notes тощо)
 * @param {Array} products — товари з кошика
 */
export const createOrder = async (orderData, products = []) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Brak tokena autoryzacji — użytkownik niezalogowany.");

    const payload = {
      ...orderData,
      products: products.map((item) => ({
        productId: item.id,
        productName: item.title,
        imageUrl: item.imageUrl || item.image || null,
        price: item.price,
        quantity: item.quantity,
      })),
      total: products.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };

    const response = await fetch("/api/orders", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Nie udało się utworzyć zamówienia:", error.response?.data || error.message);
    throw error;
  }
};
