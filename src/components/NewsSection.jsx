import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getUserRole } from "../Utils/roles";

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newImage, setNewImage] = useState("");
  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const role = await getUserRole(user.uid);
        setUserRole(role);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "news"), (snapshot) => {
      setNews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const addNews = async () => {
    if (!newTitle || !newContent) return;
    await addDoc(collection(db, "news"), {
      title: newTitle,
      content: newContent,
      image: newImage || "",
      createdAt: new Date(),
    });
    setNewTitle("");
    setNewContent("");
    setNewImage("");
  };

  const deleteNews = async (id) => {
    await deleteDoc(doc(db, "news", id));
  };

  const updateNews = async (id, updatedContent) => {
    await updateDoc(doc(db, "news", id), updatedContent);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold mb-4 text-green-800">Aktualności</h2>

      {userRole === "admin" && (
        <div className="bg-gray-100 p-4 rounded mb-6">
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
          <button
            onClick={addNews}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
          >
            Dodaj aktualność
          </button>
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

            {userRole === "admin" && (
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
  );
};

export default NewsSection;
