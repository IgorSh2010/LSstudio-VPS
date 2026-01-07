import { useEffect } from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton";
import { Banknote, CircleCheckBig, X, ShoppingCart} from "lucide-react";
import { Button } from "./UI/Button";

const Products = ({ initialProducts = null, cartButton, title }) => {
  
  useEffect(() => {
    if (initialProducts) return;
  });

  return (
    <div>
      {title && <h1 className="text-3xl font-bold text-textPrimary">{title}</h1>}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {initialProducts.map((product) => (
            <article
              className="
                group rounded-2xl
                flex flex-col h-full
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
              <Link to={`/productsMain/${product._id}`} key={product._id}>
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
              </Link>  

              {cartButton && (
                <Button
                  variant="primary"
                  className="mt-auto w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    // onAddToCart?.(product);
                  }}
                >
                  Dodaj do
                  <ShoppingCart size={18} className="ml-2" />
                </Button>
              )}
            </article>          
        ))}
      </div>
    </div>
  );
};

export default Products;