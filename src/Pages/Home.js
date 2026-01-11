import Carrousel from '../components/Carrousel';
import NewsSection from '../components/NewsSection';
import { useEffect, useState } from 'react';
import { getProducts } from '../api/public';

export default function Home() {
  const limit = 5;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts(limit);
        setProducts(products);
      } catch (error) {
        console.error('Błąd pobierania produktu:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
    <div className="p-2 ml-8 w-full">
      <Carrousel 
        products={products}
        title="Ostatnio dodane"
        showButton={true}
        onDetailsClick={(product) => console.log(product)} 
      />      
    </div>  

    <NewsSection />   

    {/* <div className="bg-red-200 shadow-md p-6 text-center">
      <h2 className="text-4xl font-bold text-green-800">Strona główna</h2>
      <p className="text-lg text-gray-600">Zapraszamy serdecznie na naszą stronę "LS Studio"!</p>
      <p className="text-gray-700">
      Tutaj znajdą się podstawowe informacje o działalności naszej firmy
      (zdjęcia, filmy, blok z aktualnościami).
      </p>
      <p></p>
      <h2 className="text-4xl font-bold text-green-800">Main site</h2>
      <p className="text-lg text-gray-600">WELLCOME on a site of LS Studio!</p>
      <p className="text-gray-700">
      This section will contain key information about our company activities
      (photos, videos, a news section).
      </p>
      <p></p>      
      <h2 className="text-4xl font-bold text-green-800">Головна сторінка</h2>
      <p className="text-lg text-gray-600">Ласкаво просимо на сайт "LS Studio"!</p>
      <p className="text-gray-700">
        Тут буде основна інформація про нашу діяльність 
        (фото, відео, блок новин).
      </p>
      <p></p>
      
      <p></p>
    </div> */}
  </>   
  )
}