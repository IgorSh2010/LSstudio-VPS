import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FavoriteButton from "../components/FavoriteButton";
import Breadcrumbs from '../components/Breadcrumbs'
import OrderButton from "../components/OrderButton";

const API_URL = "http://129.159.28.206:4000/api";

//Got favorites
export default function Favorites() {
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [hiddenCard, setHiddenCard] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/login");
        return;
        }

        const fetchFavorites = async () => {
        try {
            const res = await fetch(`${API_URL}/favorites`, {
            headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
            return;
            }
            const data = await res.json();
            setFavorites(data);
        } catch (err) {
            console.error("Помилка завантаження улюблених:", err);
        } finally {
            setLoading(false);
        }
        };

    fetchFavorites();
    }, [navigate]);

//Delete favorite
const handleUnfavorite = async (productId) => {
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
  };

  if (loading) {
    return <div className="text-center mt-10">Ładowanie ulubionych...</div>;
  }

  if (favorites.length === 0) {   
     return (
        <div className="text-center mt-10 text-gray-700">
        <Breadcrumbs />
        <p className="text-lg">Brak ulubionych produktów</p>
        </div>
        );
    }    

    return (
    <>
    <div className='ml-1'><Breadcrumbs /></div>

    {favorites.length > 0 && (
    <div className="max-w-screen-xl mx-auto p-4 inset-0 pointer-events-auto">
        <h2 className="text-xl font-semibold mb-6">Ulubione produkty:</h2>    
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 bg-white/5 backdrop-blur-md">
        {favorites.map(fav => (
          <Link to={`/productsMain/${fav.id}`} key={fav.id}
                    className={`relative transition-all duration-500 ease-in-out 
                        ${hiddenCard === fav.id ? 'opacity-0 scale-95' : 'opacity-100'}`}>  
            <div className="bg-red-200 border p-4 rounded shadow hover:shadow-md transition max-w-xs w-full mx-auto">         
                <div className="flex justify-start items-center">
                    {fav.imageUrl && (
                        <img
                        src={fav.imageUrl}
                        alt={fav.title}
                        className="w-full h-32 object-contain mb-2 rounded"
                        />
                    )}
                
                    <div className="border w-full p-2 rounded bg-pink-50 text-sm"> 
                        <p><strong>{fav.title}</strong></p>
                        <p>{fav.price} zł</p>
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <OrderButton product={fav}/>

                    <FavoriteButton productId={fav.id}
                                    product={fav}
                                    onUnliked={() => {
                                    setHiddenCard(fav.id); // start animation
                                    setTimeout(() => {
                                        setFavorites(favs => favs.filter(item => item.id !== fav.id));
                                        setTimeout(() => setHiddenCard(null));
                                }, 400); // match with duration
                                }} 
                    /> 
                </div>                      
            </div> 
          </Link>
        ))}
        </div>
    </div>
    )}
    </>
    )
}