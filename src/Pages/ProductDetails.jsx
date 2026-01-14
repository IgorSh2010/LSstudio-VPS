import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductByID } from '../api/public'
import FavoriteButton from "../components/ui/FavoriteButton";
import Breadcrumbs from '../components/Breadcrumbs';
import { Button } from "../components/ui/Button";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getPreviewImg } from '../lib/utils';

import { Banknote, CircleCheckBig, X, BookOpenText } from 'lucide-react'; 

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [currentImage, setCurrentImage] = useState(0);
  const images = product?.images?.length ? product.images : ["/logoLS.png"];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) nextImage();
    else if (info.offset.x > swipeThreshold) prevImage();
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductByID(id)
      setProduct(product)
    }
    fetchProduct()
  }, [id])

  /* useEffect(() => {
    localStorage.setItem("lastViewedProductId", id);
  }, [id]);
 */
  if (!product) {
    return <div className="p-6 text-center text-textPrimary/80">Loading…</div>
  }

  return (
    <>
      <div className="ml-1">
        <Breadcrumbs />
      </div>

      <section className="md:ml-60 ml-1 max-w-4xl mx-auto p-5 rounded-xl
        bg-bgPrimary/5 backdrop-blur-md shadow-sm border border-border/20">

        {/* Image */}
        {/* {product.imageUrl && (
          <a href={product.imageUrl} target="_blank" rel="noreferrer">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full max-h-[480px] object-contain rounded-lg
              mx-auto cursor-zoom-in transition-transform hover:scale-[1.02]"
            />
          </a>
        )} */}        
        <div className="overflow-hidden rounded-xl bg-bgSecondary/60">
          <AnimatePresence mode="wait">
            <motion.img
              loading="lazy"
              key={images[currentImage]}
              src={(images[currentImage])}
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

        {/* Title + fav */}
        <div className="flex items-start justify-between mt-4 gap-4">
          <h2 className="text-3xl font-bold text-textPrimarytracking-tight">
            {product.name}
          </h2>
          <FavoriteButton productId={id} product={product} />
        </div>

        {/* Price + availability */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">

          {/* Price */}
          <p className="flex items-center gap-2 text-xl font-semibold text-textPrimary">
            <Banknote size={22} className="text-green-600/90" />
            <span>{product.price} zł</span>
          </p>

          {/* Availability */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-green-600/90
            bg-bgAccent/80 border border-border text-sm font-medium">
            {product.is_available ? (
              <>
                <CircleCheckBig size={18} />
                <span>Dostępny</span>
              </>
            ) : (
              <>
                <X size={18} className="text-pink-600" />
                <span className="text-pink-600">
                  Na zamówienie
                </span>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 p-4 rounded-lg bg-bgSecondary/40 border border-border">
          <div className="flex items-start gap-3">
            <BookOpenText size={22} className="text-fujiBase mt-0.5" />
            <p className="text-base font-medium leading-relaxed text-fujiBase">
              {product.description}
            </p>
          </div>
        </div>

        {/* Тут ідеально ляже ToCartButton у сакурному primary */}
        <Button variant="primary" className="mt-6 w-full">
          Dodaj do koszyka <ShoppingCart size={18} className="ml-2" />
        </Button>
      </section>
    </>
  )
}
