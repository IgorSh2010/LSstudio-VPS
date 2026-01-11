import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../api/user";
import { Button } from "./ui/Button";

const NewsSection = () => {
  //const { role } = useAuth();
  const [news, setNews] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newImage, setNewImage] = useState("");
  const [role, setUserRole] = useState("user");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await getMe();        
        setUserRole(res.user.role || "user");

      } catch (err) {
        console.warn("❌ Не вдалося отримати користувача:", err);
        localStorage.removeItem("token");
      }
    }

    fetchUser();
  })
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) return;

  //   // 🔐 Отримуємо роль користувача з токена
  //   try {
  //     const payload = JSON.parse(atob(token.split(".")[1]));
  //     setUserRole(payload.role || "user");
  //   } catch {
  //     console.warn("Nie można odczytać roli z tokena");
  //   }
  // }, []);

  // 📥 Завантаження новин
  /* const fetchNews = async () => {
    try {
      const res = await API.get("/api/news");
      setNews(res.data);
    } catch (err) {
      console.error("❌ Błąd podczas pobierania newsów:", err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []); */

  const addNews = async () => {
    if (!newTitle || !newContent) return alert("Wprowadź tytuł i treść");

    try {
      const token = localStorage.getItem("token");
      await fetch(
        "/api/news",
        { title: newTitle, content: newContent, image: newImage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTitle("");
      setNewContent("");
      setNewImage("");
      // fetchNews();
    } catch (err) {
      console.error("❌ Nie udało się dodać newsu:", err);
      if (err.response?.status === 401) navigate("/login");
    }
  };

  const deleteNews = async (id) => {
    if (!window.confirm("Na pewno usunąć ten news?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // fetchNews();
    } catch (err) {
      console.error("❌ Błąd usuwania:", err);
    }
  };

  const updateNews = async (id, updatedContent) => {
    const newTitlePrompt = prompt("Nowy tytuł:");
    const newContentPrompt = prompt("Nowa treść:");
    if (!newTitlePrompt || !newContentPrompt) return;

    try {
      const token = localStorage.getItem("token");
      await fetch(
        `/api/news/${id}`,
        { title: newTitlePrompt, content: newContentPrompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // fetchNews();
    } catch (err) {
      console.error("❌ Błąd edycji newsu:", err);
    }
  };

  return (
  <>
    <div className="ml-8 w-full p-2">
      <h2 className="text-3xl font-extrabold text-textPrimary">Aktualności</h2>
    </div>
    <div className="max-w-7xl mx-auto p-6">
      {role === "admin" && (
        <div className="bg-bgSecondary p-4 rounded mb-6">
          <input
            type="text"
            placeholder="Tytuł"
            className="border p-2 w-full mb-2"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            placeholder="Treść"
            className="border p-2 w-full mb-2"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="URL zdjęcia lub filmu"
            className="border p-2 w-full mb-2"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
          />
          <Button variant="primary"
            onClick={addNews}>
            Dodaj nowość
          </Button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {news.map((item) => (
          <div key={item.id} className="bg-white shadow p-4 rounded">
            {item.image && (
              item.image.endsWith(".mp4") ? (
                <video className="w-full rounded mb-2" controls>
                  <source src={item.image} type="video/mp4" />
                </video>
              ) : (
                <img src={item.image} alt={item.title} className="w-full rounded mb-2" />
              )
            )}
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-gray-700">{item.content}</p>

            {role === "admin" && (
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => deleteNews(item.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Usuń
                </button>
                <button
                  onClick={() => updateNews(item.id, { title: prompt("Nowy tytuł:", item.title) })}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Edytuj
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </>
  );
};

export default NewsSection;
