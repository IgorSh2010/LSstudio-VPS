import Products from '../components/ProductsGrid'
import { useState, useEffect } from 'react'
import { getProducts } from "../api/public";
import CategoryFilter from "../components/CategoryFilter";
import Breadcrumbs from '../components/Breadcrumbs';

export default function ProductsMain() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const products = await getProducts();
          setProducts(products.data.items);
        } catch (error) {
          console.error("Błąd pobierania produktów:", error);
        }        
      }

      fetchProducts();
    }, []);

  return (
  <>
    <div className='ml-1'><Breadcrumbs /></div>    
    <div className="ml-1 bg-white/5 rounded-2xl backdrop-blur-md shadow-md p-2"> 
      {selectedCategory ? <h2 className="text-3xl px-3 font-bold text-textPrimary/80"> {selectedCategory}</h2> 
                        : <h2 className="text-3xl px-3 font-bold text-textPrimary/80"> Wszystkie wyroby </h2> }
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mt-1 px-3">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
            products={products}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (            
          <Products initialProduct={product} cartButton={true} key={product.id}/>                
        ))}
      </div>
    </div>
  </>
  )
}
