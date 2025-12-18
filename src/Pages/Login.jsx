import { useState } from "react";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "", tenant: "lsstudio"}) 
  const [modalMessage, setModalMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(loginData);

      if (res.token) {
        localStorage.setItem("token", res.token);

        //window.location.href = "/admin/products";
        
        // 🔹 Переходимо далі (наприклад, на акаунт або останній переглянутий продукт)
        const lastProductId = localStorage.getItem("lastViewedProductId");
        if (lastProductId) {
          navigate(`/productsMain/${lastProductId}`);
          localStorage.removeItem("lastViewedProductId"); 
        } else {
          navigate("/account"); 
        }
        setModalMessage("✅ Zalogowano pomyślnie!");

        //setToast({ show: true, message: "✅ Zalogowano pomyślnie!", type: "success" });
        //setTimeout(() => setToast({ show: false, message: "" }), 4000);
      } else {
        setModalMessage("❌ Błąd logowania. Sprawdź swoje dane.");
      //setToast({ show: true, message: "❌ Błąd logowania. Sprawdź swoje dane.", type: "error" });
      //setTimeout(() => setToast({ show: false, message: "" }), 4000);
      }      
    } catch (error) {
      setModalMessage("Błąd: " + error.message);
    }
  };

  return (
    <>
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-36 md:mt-16">
      <h2 className="text-2xl text-center font-bold mb-2">Logowanie </h2>
      <h2 className="text-xl text-center font-bold mb-2">dla zarejestrowanych użytkowników</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Twoj adres e-mail, podany pod czas rejestracji..."
          className="w-full border p-2"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Wprowadź hasło..."
          className="w-full border p-2"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          required
        />
        <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 w-full">
          Zaloguj się
        </button>
      </form>
    </div>

    {modalMessage && (
      <Modal message={modalMessage} onClose={() => {
        setModalMessage(null);
        if (modalMessage == null) {
          navigate("/account");
        }
      }} />
    )}
  </>
);
};

export default Login;