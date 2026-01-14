import api from "./axios";

export async function registerUser(data) {
  const { data: resData } = await api.post("/auth/register", data, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  localStorage.setItem("token", resData.token);
  return resData;
}

export async function loginUser(loginData) {
    try {
    const { data } = await api.post("/auth/login", {
      email: loginData.email,
      password: loginData.password,
      tenant: loginData.tenant,
    }, 
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    console.error("❌ loginUser error:", error);
    throw error;
  }
}

export async function logout() {
  try {
    await api.post("/auth/logout", {}, { withCredentials: true }); 
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    localStorage.removeItem("token");
    window.location.href = "/";
  }
}