import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { addFavorite, removeFavorite, getFavorites } from "../../api/user";

const FavoriteButton = ({ productId, product, onUnliked }) => {
  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
   const checkFavorite = async () => {
      try {
        if (localStorage.getItem("token") === null) {
          setLiked(false);
          return;
        }

        const res = await getFavorites(productId);
        console.log(res);
        if (res?.includes?.(productId)) {
          setLiked(true);
        }
      } catch (err) {
        setLiked(false);
        console.error("Помилка перевірки улюбленого:", err);
      }
    };
    checkFavorite();
  }, [productId]);

const handleLike = async () => {
  try {
    if (liked) {
      setConfirmDelete(true);
    } else {
      const res = addFavorite(productId);
        if (res.ok) {
          setLiked(true);
          setAnimate(true);
          setTimeout(() => setAnimate(false), 300);
        }
    }
  } catch (err) {
    console.error("Помилка оновлення улюбленого:", err);
    setModalMessage("Błąd: " + err.message);
  };
}
  const handleDeleteConfirmed = async () => {
  try {
      const res = await removeFavorite(productId);
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
          //navigate("/login");        
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