import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { Button } from "../components/ui/Button";
import { registerUser } from "../api/auth";
import { Eye } from "lucide-react";

const Register = () => {
  const [registerData, setRegisterData] = useState({ email: "", password: "", tenant: "lsstudio" })
  const [confirm, setConfirm] = useState("");
  const passwordsMatch = confirm.length === 0 || registerData.password === confirm;
  const [modalMessage, setModalMessage] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (registerData.password !== confirm) {
      setModalMessage("Hasła nie są podobne! Spróbuj jeszcze raz.");
      return;
    }

    if (!acceptTerms) {
      setModalMessage("Aby się zarejestrować musisz zaakceptować Regulamin i Politykę prywatności.");
      return;
    }

    try {
      const res = await registerUser(registerData);

      if (!res.error) {
        setModalMessage("Rejestracja powiodła się! Możesz się teraz zalogować.");
      }
    } catch (error) {
      setModalMessage("UWAGA: " + error.message);
    }
  };
  
  return (
    <>
      <div className="max-w-md mx-auto p-6 text-textPrimary bg-bgPrimary shadow rounded mt-16">
        <h2 className="text-2xl font-bold mb-4">Rejestracja nowego konta</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Twój adres e-mail"
            className="w-full border p-2"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            required
          />
          <div className="relative">
            <input
              type={showPassword1 ? "text" : "password"}
              placeholder="Wprowadź hasło"
              className="w-full border p-2 pr-10"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
              required
            />

            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 select-none"
              onMouseDown={() => setShowPassword1(true)}
              onMouseUp={() => setShowPassword1(false)}
              onMouseLeave={() => setShowPassword1(false)}
              onTouchStart={() => setShowPassword1(true)}
              onTouchEnd={() => setShowPassword1(false)}
            >
              <Eye />
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword2 ? "text" : "password"}
              placeholder="Hasło (powtórzenie)"
              className="w-full border p-2 pr-10 bg-fujiLight/5"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />

            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 select-none"
              onMouseDown={() => setShowPassword2(true)}
              onMouseUp={() => setShowPassword2(false)}
              onMouseLeave={() => setShowPassword2(false)}
              onTouchStart={() => setShowPassword2(true)}
              onTouchEnd={() => setShowPassword2(false)}
            >
              <Eye />
            </button>
          </div>

          {!passwordsMatch && (
            <p className="text-sm text-red-600">
              Hasła muszą być identyczne
            </p>
          )}

          <div className="flex items-start space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              id="rules"
              className="mt-1"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              required
            />
            <label htmlFor="rules">
              Rejestrując się, akceptujesz{" "}
              <a href="/regulamin" target="_blank" className="text-pink-600 underline">Regulamin</a>{" "}
              oraz{" "}
              <a href="/regulamin" target="_blank" className="text-pink-600 underline">Politykę Prywatności</a>.
            </label>
          </div>

          <Button variant = "primary" className=" w-full" //disabled={!passwordsMatch || !acceptTerms} 
                  type="submit">
            Zarejestruj się
          </Button>
        </form>
      </div>

      {modalMessage && (
        <Modal message={modalMessage} onClose={() => {
          setModalMessage(null);
          if (modalMessage === "Rejestracja powiodła się! Sprawdź skrzynkę e-mail, aby potwierdzić adres.") {
            navigate("/account");
          }
          //else { navigate("/login"); }
        }} />
      )}
    </>
  );
};

export default Register;