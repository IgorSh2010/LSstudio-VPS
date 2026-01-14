import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/Button";
import AddProductForm from "./AddProductForm";
import { Pencil, Trash2 } from "lucide-react";
import { getProducts } from "../api/products";

export default function AdminProductsAll( ) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("❌ Błąd pobierania produktów:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);    
    
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    // TODO: API delete
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-peachFaint/60 via-peachSoft/80 to-bgAccent p-4
                    rounded-2xl shadow-xl">
      <div className="max-w-6xl mx-auto space-y-2">

        {/* Заголовок */}
        <div>
          <h1 className="text-3xl font-semibold text-slate-800">
            Адмінка · Товари
          </h1>
          <p className="text-textSecondary">
            Керування асортиментом, як у спокійному саду дзен
          </p>
        </div>

        {/* Додавання нового товару */}
        <AddProductForm onProductAdded={fetchProducts}/>

        {/* Список товарів */}
        <div className="space-y-4">
          {loading && (
            <p className="text-slate-500">Завантаження товарів…</p>
          )}

          {!loading && products.map((product) => (
            <Card
              key={product.id}
              className="border-slate-200 hover:shadow-md transition"
            >
              <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border bg-white">
                  {product.images?.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                      no image
                    </div>
                  )}
                </div>

                {/* Інфо */}
                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-medium text-slate-800">
                    {product.title}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {product.price} zł ·
                    <span
                      className={
                        product.is_available
                          ? "text-emerald-600"
                          : "text-rose-500"
                      }
                    >
                      {product.is_available
                        ? ` В наявності: ${product.quantity}`
                        : " Немає в наявності"}
                    </span>
                  </p>
                </div>

                {/* Кнопки */}
                <div className="flex space-x-1 gap-2">
                  <Button
                    asChild
                    variant="secondary"
                  >
                    <Link to={`/admin/products/${product.id}`}>
                      <Pencil size={16} className="mr-1" />
                      Редагувати
                    </Link>
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 size={16} className="mr-1" />
                    Видалити
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
