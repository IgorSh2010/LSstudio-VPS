import api from "./axios";

export async function addProduct(formData) {
  const { data } = await api.post("/products/create",
    formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
}

export async function updateProduct(changedFields, id) {
  try {
    const formData = new FormData();

    for (const key in changedFields) {
      if (key !== "images") formData.append(key, changedFields[key]);
    }

    if (changedFields.images && changedFields.images.length > 0) {
      Array.from(changedFields.images).forEach((file) =>
        formData.append("images", file)
      );
    }

    if (changedFields.removedImages && changedFields.removedImages.length > 0) {
      formData.append("removedImages", JSON.stringify(changedFields.removedImages));
    }
    const res = await api.put(`/products/update/${id}`, formData, {
                          headers: { "Content-Type": "multipart/form-data" },
                        });
    return res.data;
  } catch (err) {
    console.error("❌ Błąd aktualizacji produktu:", err);
    throw err;
  }
}

export async function getProducts() {
  const { data } = await api.get(`/products/get`);
  return data;
} 

export async function getProductByID(productID) {
  const { data } = await api.get(`/products/get/${productID}`);
  return data;
}

export async function delProduct(productID) {
  const res = await api.delete(`/products/${productID}`);
  return res;
}
export async function getStatsDashboard() {
  const { data } = await api.get(`/products/stats`);
  return data;
  
}