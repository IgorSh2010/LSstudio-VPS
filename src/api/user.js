import api from "./axios";

export async function getMe() {
  const { data } = await api.get("/users/me");
  return data;
}

export async function checkToken() {
  const token = localStorage.getItem("token");
  const res = await api.get(`/verify-token`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.ok; // якщо 200 — токен ще дійсний
}
export async function updateUser(data) {
  const response = await api.post("/users/update", data);
  return response.data;
}

export async function uploadImage(formData) {
  const response = await api.post("/users/upload-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export const getImage = async () => {
  const res = await api.get("/users/get-image");
  return res.data;
};

export const getClientOrder = async (id = "main") => {
  const res = await api.get(`/users/client-order/${id}`);
  return res.data;
};

export const getAdminOrder = async (id = "main") => {
  const res = await api.get(`/admin/order/${id}`);
  return res.data;
};

export const getPDFInvoice = async (orderId) => {
  const res = await api.get(`/admin/orders/${orderId}/invoice`, {
    responseType: "blob", 
  });

  const blob = new Blob([res.data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);

  window.open(url);

  // скачуємо файл
  /* const a = document.createElement("a");
  a.href = url;
  a.download = `faktura-${orderId}.pdf`;
  a.click(); */

  window.URL.revokeObjectURL(url);
};


export const getCart = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get("/users/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addCartItem = async (token, productID, quantity, price) => {
  const res = await api.post(
    "/users/cart",
    { productID, quantity, price },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

export const removeCartItem = async (token, productID) => {
  const res = await api.delete(`/users/remove-from-cart/${productID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export const clearCartAPI = async (token) => {
  const res = await api.delete(`/users/clearCart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

//getOrderStatuses, updateOrderStatus
export const getOrderStatuses = async () => {
  const res = await api.get(`/admin/order-statuses`);
  return res.data;
}

export const updateOrderStatus = async (id, status_id) => {
  const res = await api.put(`/admin/update-order-status/${id}`, { status_id });
  return res.data;
}

export const getPaymentMethods = async () => {
  const res = await api.get(`/admin/payment-methods`);
  return res.data;
}

export const updateOrderPayment = async (id, parameter, is_date = false) => {
  const res = await api.put(`/admin/update-order-payment/${id}`, { parameter, is_date });
  return res.data;
}
export const createOrder = async (data) => {
  const token = localStorage.getItem("token");
  const res = await api.post(`/users/create-order`, 
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    });
  return res.data;
}

export const getConversations = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/users/conversations`, 
    {
      headers: { Authorization: `Bearer ${token}` },
    });
  return res.data;
}

/* export const getFavorites = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/users/favorites`, 
    {
      headers: { Authorization: `Bearer ${token}` },
    });
  return res.data;
} */

export const getFavorites = async (productId = "all") => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/products/favorites/${productId}`, 
    {
      headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;  
}

export const addFavorite = async (productId) => {
  const token = localStorage.getItem("token");
  const res = await api.post(`/products/favorites/${productId}`, 
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    });
    
  return res.data;
}

export const removeFavorite = async (productId) => {
  const token = localStorage.getItem("token");
  const res = await api.delete(`/products/favorites/${productId}`, 
    {
      headers: { Authorization: `Bearer ${token}` },
    });
  return res.data;
}

export const fetchMessages = async (id) => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/users/messages/${id}`, 
    {
      headers: { Authorization: `Bearer ${token}` },
    });
  //console.log(res);
  return res.data;
}

export const sendMessageToConversation = async (id, content) => {
  const token = localStorage.getItem("token");
  const res = await api.post(`/users/send-message/${id}`, 
    { content },
    {
      headers: { Authorization: `Bearer ${token}` },
    });
  return res.data;
}

export const pollMessages = async (id, lastMessageId) => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/users/messages/${id}/poll?lastMessageId=${lastMessageId}`, 
    {
      headers: { Authorization: `Bearer ${token}` },
    });
  return res.data;
}

export const markReadConversation = async (id) => {
  const token = localStorage.getItem("token");
  const res = await api.post(`/users/conversations/${id}/mark-read`, 
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    });
  return res.data;
}

export const getStats = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/users/stats`, 
    {
      headers: { Authorization: `Bearer ${token}` },
    });
  return res.data;
}
