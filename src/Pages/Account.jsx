import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal"; 
import { getMe, updateUser } from "../api/user";
import { Edit, Save, X, LogOut, NotebookTabs } from 'lucide-react'; //, ClockAlert
import { Button } from "../components/ui/Button";

const Account = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ 
                                          username: "",
                                          email: "",
                                          phone: "",
                                          adress: "",
                                          password: "",
                                          confirmPassword: "",
                                        });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  //const [emailVerified, setEmailVerified] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
   
    const fetchProfile = async () => {
      try {
        const res = await getMe();

        setUser(res.user);
        setProfile({
          email: res.user.email,
          username: res.user.username || "",
          phone: res.user.phone || "",
          adress: res.user.adress || "",
          password: "",
          confirmPassword: "",
        });
        
      } catch (err) {
        setModalMessage("Błąd ładowania informacji:" + err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

   const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      
      if (profile.password && profile.password !== profile.confirmPassword) {
        setModalMessage("❌ Hasła nie są zgodne.");
        return;
      } 

      const res = await updateUser( profile );

      //if (!res.ok) throw new Error("Informacja nie została zaktualizowana.");

    const updated = await res.json();
      setUser(updated);
      setModalMessage("Profil został zapisany!");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      setModalMessage("Informacja nie została zaktualizowana.");
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/");
  };
 
  if (loading) {
    return (
      <div className="text-center text-gray-600 py-20">
        Ładowanie profilu...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-36 md:mt-16 bg-bgPrimary shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold text-fujiBase mb-6 text-center">
        Moje konto
      </h1>

      <div className="space-y-4">

        <div className="bg-bgAccent p-4 rounded shadow-lg shadow-accentSecondary">
          <p className="text-sm text-gray-600">ID użytkownika:</p>
          <p className="font-mono break-all">{user.id}</p>
        </div>

        <div className="bg-bgAccent p-4 rounded shadow-lg shadow-accentSecondary">
          <p className="text-sm text-gray-600">E-mail:</p>
          <p>{user.email}</p>
        </div>

        <div className="bg-bgAccent p-4 rounded shadow-lg shadow-accentSecondary">
          <p className="text-sm text-gray-600">Imię i Nazwisko:</p>
          {editMode ? (
            <input
              type="text"
              className="w-full border p-2 rounded mt-1"
              value={profile.username}
              onChange={handleChange}
            />
          ) : (
            <p className="mt-1">{profile.username || "-"}</p>
          )}
        </div>

        <div className="bg-bgAccent p-4 rounded shadow-lg shadow-accentSecondary">
          <p className="text-sm text-gray-600">Numer telefonu:</p>
          {editMode ? (
            <input
              type="text"
              className="w-full border p-2 rounded mt-1"
              value={profile.phone}
              onChange={handleChange}
            />
          ) : (
            <p className="mt-1">{profile.phone || "-"}</p>
          )}
        </div>

        <div className="bg-bgAccent p-4 rounded shadow-lg shadow-accentSecondary">
          <p className="text-sm text-gray-600">Adres:</p>
          {editMode ? (
            <input
              type="text"
              className="w-full border p-2 rounded mt-1"
              value={profile.adress}
              onChange={handleChange}
            />
          ) : (
            <p className="mt-1">{profile.adress || "-"}</p>
          )}
        </div>

        <div className="bg-bgAccent p-4 rounded shadow-lg shadow-accentSecondary">
          <p className="text-sm text-gray-600">Nowe hasło:    (pozostaw puste, jak nie zmieniasz stare hasło)</p>
          {editMode ? (
            <input
              type="password"
              className="w-full border p-2 rounded mt-1"
              value={profile.password}
              onChange={handleChange}
              plaseholder="Pozostaw puste, jak nie zmieniasz stare hasło"
            />
          ) : (
            <p className="mt-1">{profile.password || "***********"}</p>
          )}
        </div>

        <div className="bg-bgAccent p-4 rounded shadow-lg shadow-accentSecondary">
          <p className="text-sm text-gray-600">Powtórz nowe hasło:</p>
          {editMode ? (
            <input
              type="password"
              className="w-full border p-2 rounded mt-1"
              value={profile.confirmPassword}
              onChange={handleChange}
              plaseholder="Powtórz nowe hasło"
            />
          ) : (
            <p className="mt-1">{profile.confirmPassword || "***********"}</p>
          )}
        </div>

        {/* Przyciski */}
        <div className="flex flex-col md:flex-row justify-between mt-4 space-y-2 md:space-y-0 md:space-x-4">
          {editMode ? (
            <>
              <Button variant="primary"
                onClick={handleSave}
                className="w-full"
              >
                <Save size={20} />Zapisz
              </Button>

              <Button variant="danger"
                onClick={() => setEditMode(false)}
                className="w-full"
              >
                <X size={20} />Anuluj
              </Button>
            </>
          ) : (
            <Button variant="primary" className="w-full"
                onClick={() => setEditMode(true)}><Edit size={20} />Edytuj profil</Button>
            
          )}
        </div>

        <Button variant="secondary" className="w-full"
          onClick={() => navigate("/orders")}          
        >
          <NotebookTabs size={20} /> Moje zamówienia
        </Button>

        <Button variant="danger" className="w-full"
          onClick={handleLogout}
        >
          <LogOut size={20}/> Wyloguj się
        </Button>

        {modalMessage && (
          <Modal
            message={modalMessage}
            onClose={() => setModalMessage("")}
            onConfirm={() => setModalMessage("")}
            confirmMode={false} />
        )}
      </div>
    </div>
  );
};

export default Account;