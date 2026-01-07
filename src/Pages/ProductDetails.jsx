import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../sanityClient'
import FavoriteButton from "../components/FavoriteButton";
import Breadcrumbs from '../components/Breadcrumbs';
import { Button } from "../components/UI/Button";
import { ShoppingCart } from "lucide-react";

import { Banknote, CircleCheckBig, X, BookOpenText } from 'lucide-react'; 

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    client.fetch(`*[_type == "product" && _id == $id][0]{
      _id,
      title,
      description,
      price,
      "imageUrl": image.asset->url,
      category,
      available
    }`, { id }).then(setProduct).catch(console.error)
  }, [id])

  useEffect(() => {
    localStorage.setItem("lastViewedProductId", id);
  }, [id]);

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
        {product.imageUrl && (
          <a href={product.imageUrl} target="_blank" rel="noreferrer">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full max-h-[480px] object-contain rounded-lg
              mx-auto cursor-zoom-in transition-transform hover:scale-[1.02]"
            />
          </a>
        )}

        {/* Title + fav */}
        <div className="flex items-start justify-between mt-4 gap-4">
          <h2 className="text-3xl font-bold text-textPrimarytracking-tight">
            {product.title}
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
            {product.available ? (
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
