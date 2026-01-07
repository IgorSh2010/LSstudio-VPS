import { useEffect, useState } from 'react'
import { getFavorites } from '../api/user'
import Breadcrumbs from '../components/Breadcrumbs'
import OrderButton from "../components/OrderButton";
import ProductsGrid from '../components/ProductsGrid'

//Got favorites
export default function Favorites() {
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [hiddenCard, setHiddenCard] = useState(null);

    useEffect(() => {
        const fetchFavorites = async () => {
        try {
            const data = await getFavorites("all");
            setFavorites(data);
        } catch (err) {
            console.error("Помилка завантаження улюблених:", err);
        } finally {
            setLoading(false);
        }
        };
    fetchFavorites();
    }, []);

//Delete favorite
/* const handleUnfavorite = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/favorites/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setHiddenCard(productId);
        setTimeout(() => {
          setFavorites((favs) => favs.filter((f) => f.id !== productId));
          setHiddenCard(null);
        }, 400);
      }
    } catch (err) {
      console.error("Помилка видалення з улюблених:", err);
    }
  }; */

  if (loading) {
    return <div className="text-center mt-10">Ładowanie ulubionych...</div>;
  }

  if (favorites.length === 0) {   
     return (
              <>
                <Breadcrumbs />
                <div className="text-center py-20 text-textSecondary">          
                  <p className="text-lg">Brak ulubionych produktów</p>
                  <p className="text-sm opacity-70 mt-1">
                    Kliknij ♡ aby dodać coś do ulubionych
                  </p>
                </div>
              </>  
            );
    }    

    return (
    <>
    <div className='ml-1'><Breadcrumbs /></div>

    {favorites.length > 0 && (
    <div className="max-w-screen-xl mx-auto p-4 inset-0 pointer-events-auto">
        <h2 className="text-xl font-semibold mb-6">Ulubione produkty:</h2>    

      <ProductsGrid initialProducts={favorites} cartButton={false} title="Ulubione" />      
    </div>
    )}
    </>
    )
}