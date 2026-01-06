import { useEffect, useState } from "react";
import { client } from "../sanityClient";
import { Link } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter";
import FavoriteButton from "../components/FavoriteButton";
import { Banknote, CircleCheckBig, X } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "product"]{
        _id,
        title,
        description,
        price,
        "imageUrl": image.asset->url,
        category,
        available
      }`)
      .then(setProducts)
      .catch(console.error);
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div>
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mt-2">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
            products={products}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link to={`/productsMain/${product._id}`} key={product._id}>
            <article
              className="
                group h-full
                rounded-2xl
                bg-bgPrimary/60
                backdrop-blur-md
                border border-pink-200/40
                shadow-sm
                hover:shadow-md
                hover:bg-bgPrimary/70
                hover:border-border
                transition-all
                p-4
              "
            >
              {product.imageUrl && (
                <div className="overflow-hidden rounded-xl bg-bgSecondary/60">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="
                      w-full h-48 object-contain
                      transition-transform duration-300
                      group-hover:scale-105
                    "
                  />
                </div>
              )}

              <div className="flex items-start justify-between mt-3 gap-2">
                <h3 className="text-lg font-semibold text-textPrimary leading-tight">
                  {product.title}
                </h3>
                <FavoriteButton productId={product._id} product={product} />
              </div>

              <p className="mt-1 text-sm text-textSecondary/80 line-clamp-2">
                {product.description}
              </p>

              <div className="flex justify-between items-center mt-3 text-sm">
                <p className="flex items-center gap-2 font-bold text-textPrimary">
                  <Banknote size={16} className="text-greenMoss" />
                  {product.price} zł
                </p>

                {product.available ? (
                  <span className="flex items-center gap-1 text-green-600/80 font-bold text-xs">
                    <CircleCheckBig size={16} />
                    Dostępny
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-gray-500 text-xs">
                    <X size={16} />
                    Na zamówienie
                  </span>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;