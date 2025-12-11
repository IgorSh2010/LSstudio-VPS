import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const API_URL = "http://129.159.28.206:4000/api";

const FavoriteButton = ({ productId, product, onUnliked }) => {
  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  const token = localStorage.getItem("token");

  useEffect(() => {
  const checkFavorite = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API_URL}/favorites/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setLiked(data.isFavorite);
        }
      } catch (err) {
        console.error("Помилка перевірки улюбленого:", err);
      }
    };
    checkFavorite();
  }, [productId, token]);

  const handleLike = async () => {
    if (!token) {
      setModalMessage("Najperw musisz się zalogować!");
      return;
    }

  try {
    if (liked) {
      setConfirmDelete(true);
    } else {
      const res = await fetch(`${API_URL}/favorites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: product.id || productId }),
        });
        if (res.ok) {
          setLiked(true);
          setAnimate(true);
          setTimeout(() => setAnimate(false), 300);
        }
    }
  } catch (err) {
    console.error("Помилка оновлення улюбленого:", err);
    setModalMessage("Błąd: " + err.message);
  }
  };

  const handleDeleteConfirmed = async () => {
  try {
      const res = await fetch(`${API_URL}/favorites/${product.id || productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setLiked(false);
        setConfirmDelete(false);
        setModalMessage("Produkt usunięty z ulubionych");
        if (onUnliked) onUnliked();
      }
    } catch (err) {
      console.error("Помилка видалення з улюблених:", err);
      setModalMessage("Błąd: " + err.message);
    }
};

  const ttl = liked ? "Usuń z ulubionych" : "Dodaj do ulubionych";

  return (
    <>
    <button
      onClick = {(e) => {
        e.stopPropagation(); // ⛔ Зупиняє перехід
        e.preventDefault();  // ⛔ Зупиняє <Link>
        handleLike();
      }}
      className = {'w-10 h-8 flex-shrink-0 ml-auto'}
      title = {ttl}
    >
      <img
        src = {liked ? '/favorite.png' : '/unfavorite.png'}
        alt="Ulubiony"
        className = {`w-10 h-8 flex-shrink-0 transition-transform ${animate ? "scale-125" : "scale-100"} duration-300`}
        style={{ flexShrink: 0 }}
      />
    </button>

    {modalMessage && (
      <Modal message={modalMessage} onClose={() => {
        setModalMessage(null);        
          navigate("/login");        
      }} />
    )}

    {confirmDelete && (
      <Modal
        message="Czy na pewno chcesz usunąć produkt z Ulubionych?"
        confirmMode
        onClose={() => setConfirmDelete(false)}      // НІ
        onConfirm={handleDeleteConfirmed}        // ТАК
      />
    )}
    </>
  );
};

export default FavoriteButton;