import { useState } from "react";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { Button } from "../components/ui/Button";
import { Eye } from "lucide-react";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "", tenant: "lsstudio"}) 
  const [modalMessage, setModalMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(loginData);
      if (res.token) {
          setModalMessage("✅ Login successful!");
          window.location.href = "/";
          navigate("/account");        
        
        /* // 🔹 Переходимо далі (наприклад, на акаунт або останній переглянутий продукт)
        const lastProductId = localStorage.getItem("lastViewedProductId");
        if (lastProductId) {
          navigate(`/productsMain/${lastProductId}`);
          localStorage.removeItem("lastViewedProductId"); 
        } else {
           
        } */
        
      } else {
        setModalMessage("❌ Błąd logowania. Sprawdź swoje dane.");
      }      
    } catch (error) {
      setModalMessage("Błąd: " + error.message);
    }
  };

  return (
    <>
    <div className="max-w-md mx-auto p-6 text-textPrimary bg-bgPrimary shadow rounded mt-36 md:mt-16">
      <h2 className="text-2xl text-center font-bold mb-2">Logowanie </h2>
      <h2 className="text-xl text-center font-bold mb-2">dla zarejestrowanych użytkowników</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Twoj adres e-mail, podany pod czas rejestracji..."
          className="w-full border p-2 "
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          required
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Wprowadź hasło..."
            className="w-full border p-2"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 transform  text-gray-500/70 -translate-y-1/2"
            onMouseDown={() => setShowPassword(true)}
            onMouseUp={() => setShowPassword(false)}
            onMouseLeave={() => setShowPassword(false)}
            onTouchStart={() => setShowPassword(true)}
            onTouchEnd={() => setShowPassword(false)}
          >
            <Eye />
          </button>
        </div>
       
        <Button variant="primary" className="w-full" type="submit">
          Zaloguj się
        </Button>
      </form>
    </div>

    {modalMessage && (
      <Modal message={modalMessage} onClose={() => {
        setModalMessage(null);
        /* if (modalMessage == null) {
          navigate("/");
        } */
      }} />
    )}
  </>
);
};

export default Login;