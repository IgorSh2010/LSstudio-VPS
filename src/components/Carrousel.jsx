import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "./ui/FavoriteButton";
import { Button } from "./ui/Button";

const Carousel = ({ products, title = "", showButton = true }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8 w-full max-w-full mx-auto">
      {title && (
        <h2 className="text-3xl font-extrabold mb-4 text-lineStrong">
          {title}
        </h2>
      )}

      <div className="w-full mx-auto overflow-hidden relative px-2">
        {products?.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-20"
          >
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <div
                  className="
                    relative z-0
                    bg-surface/80 backdrop-blur-md
                    p-4 rounded-xl
                    shadow-[0_6px_18px_rgba(43,58,103,0.12)]
                    hover:shadow-[0_10px_24px_rgba(43,58,103,0.18)]
                    transition-all
                    text-sm
                    sm:max-w-xs
                    w-full
                    mx-auto
                  "
                >
                  <div className="overflow-hidden rounded-lg bg-bgPrimary">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="
                        w-full h-32 object-contain
                        rounded
                        mb-2 mx-auto
                        transition-transform duration-300
                        hover:scale-125
                      "
                    />
                  </div>

                  <div className="flex items-start justify-between mt-3 gap-2">
                    <h3 className="text-sm font-bold text-lineStrong leading-snug">
                      {product.title}
                    </h3>
                    <FavoriteButton
                      productId={product._id}
                      product={product}
                    />
                  </div>

                  <p className="text-xs text-textSecondary mt-1 line-clamp-2">
                    {product.description}
                  </p>

                  <p className="text-sm font-bold text-textSecondary mt-2">
                    {product.price} zł
                  </p>

                  {showButton && (
                    <Button variant="primary" 
                            className="w-full"
                      onClick={() => navigate(`/productsMain/${product._id}`)}
                    >
                      Szczegóły
                    </Button>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Carousel;
