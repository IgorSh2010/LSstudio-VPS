import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [modalMessage, setModalMessage] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setModalMessage("Hasła nie są podobne! Spróbuj jeszcze raz.");
      return;
    }

    if (!acceptTerms) {
      setModalMessage("Aby się zarejestrować musisz zaakceptować regulamin i politykę prywatności.");
      return;
    }

    try {
      const res = await fetch("http://129.159.28.206:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Błąd rejestracji");
      } 

      setModalMessage("Rejestracja powiodła się! Możesz się teraz zalogować.");

    } catch (error) {
      setModalMessage("UWAGA: " + error.message);
    }
  };
  
  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-16">
        <h2 className="text-2xl font-bold mb-4">Rejestracja nowego konta</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Twój adres e-mail"
            className="w-full border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Wprowadź hasło"
            className="w-full border p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Hasło (powtórzenie)"
            className="w-full border p-2"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

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

          <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 w-full">
            Zarejestruj się
          </button>
        </form>
      </div>

      {modalMessage && (
        <Modal message={modalMessage} onClose={() => {
          setModalMessage(null);
          if (modalMessage === "Rejestracja powiodła się! Sprawdź skrzynkę e-mail, aby potwierdzić adres.") {
            navigate("/account");
          }
          else { navigate("/login"); }
        }} />
      )}
    </>
  );
};

export default Register;