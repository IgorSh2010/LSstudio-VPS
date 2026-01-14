import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FavoriteButton from "./ui/FavoriteButton";
import { Banknote, CircleCheckBig, X, ShoppingCart, ChevronLeft, ChevronRight} from "lucide-react";
import { Button } from "./ui/Button";
import { getPreviewImg } from "../lib/utils";

const Products = ({ initialProduct = null, cartButton, title }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const product = initialProduct; 
  const images = product.images?.length ? product.images : ["/logoLS.png"];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) nextImage();
    else if (info.offset.x > swipeThreshold) prevImage();
  };

  return (
    <div>
      {title && <h1 className="text-3xl font-bold text-textPrimary">{title}</h1>}
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
              <Link to={`/productsMain/${product.id}`} key={product.id}>
                  <div className="overflow-hidden rounded-xl bg-bgSecondary/60">
                    <AnimatePresence mode="wait">
                      <motion.img
                        loading="lazy"
                        key={images[currentImage]}
                        src={getPreviewImg(images[currentImage])}
                        alt={product.name}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={handleDragEnd}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="object-cover w-full h-full"
                      />
                    </AnimatePresence>

                    {/* навігація */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.preventDefault(); prevImage(); }}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/70 text-[#d4af37] p-2 rounded-full transition"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          onClick={(e) => { e.preventDefault(); nextImage(); }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/70 text-[#d4af37] p-2 rounded-full transition"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail previews */}
                  {images.length > 1 && (
                    <div className="flex justify-center gap-2 py-2 bg-gray-700/60">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => { e.preventDefault(); setCurrentImage(idx); }}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md overflow-hidden border-2 transition-all ${
                            idx === currentImage
                              ? "border-emerald-500"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img loading="lazy" src={getPreviewImg(img)} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}

                <div className="flex items-start justify-between mt-3 gap-2">
                  <h3 className="text-lg font-semibold text-textPrimary leading-tight">
                    {product.title}
                  </h3>
                  <FavoriteButton productId={product.id} product={product} />
                </div>

                <p className="mt-1 text-sm text-textSecondary/80 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center my-3 text-sm ">
                  <p className="flex items-center gap-2 font-bold text-textPrimary">
                    <Banknote size={16} className="text-greenMoss" />
                    {product.price} zł
                  </p>

                  {product.is_available ? (
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
    </div>
  );
};

export default Products;