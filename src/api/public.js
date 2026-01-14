import api from "./axios";

export async function getLogo() {
  const { data } = await api.get("/public/logo");
  if (data && data.logoUrl) {
    return data.logoUrl;
  } else {
    throw new Error("Logo not found");
  }
}

export async function getBanner() {
  const { data } = await api.get("/public/banner");
  if (data && data.bannerUrl) {
    return data.bannerUrl;
  } else {
    throw new Error("Banner not found");
  }
}

export async function getCategories() {
   const { data } = await api.get("/public/categories");
   if (data) {
    return data;
  } else {
    throw new Error("Categories not found");
  }  
}

export async function getProducts(category = "all", page = 1, limit = 12, tenant="lsstudio") {   
  const data = await api.get(`/public/getProducts?limit=${limit}&page=${page}&category=${category}&tenant=${tenant}`);
  return data;
}

export async function getProductByID(productID, tenant="lsstudio") {
  const { data } = await api.get(`/public/getProducts/${productID}?tenant=${tenant}`);
  return data;
}