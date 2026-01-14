import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/input";
import { Trash2, Save } from "lucide-react";
import { getPreviewImg } from "../lib/utils";
import { getProductByID, updateProduct, deleteProduct } from "../api/products";

export default function AdminProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductByID(id);
      setProduct(product);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleChange = (field, value) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // await updateProduct(id, product);
    console.log("💾 save", product);
    navigate("/admin/productsAll");
  };

  const handleDelete = async () => {
    //if (!confirm("Видалити товар без можливості відновлення?")) return;
    // await deleteProduct(id);
    navigate("/admin/productsAll");
  };

  if (loading || !product) {
    return <p className="text-slate-500">Завантаження…</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-peachFaint/60 via-fujiBase/60 to-bgAccent p-6 rounded-2xl shadow-xl">
      <div className="max-w-5xl mx-auto">

        <Card className="bg-white/80 backdrop-blur rounded-2xl shadow-sm">
          <CardContent className="p-6 grid md:grid-cols-2 gap-6">

            {/* Фото */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-textPrimary">
                Фото товару
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {product.images?.map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-xl overflow-hidden border bg-white shadow-sm"
                  >
                    <img
                      src={getPreviewImg(img)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Форма */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-textPrimary">
                Дані товару
              </h3>

              <Input
                value={product.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Назва товару"
              />

              <Input
                type="number"
                value={product.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="Ціна"
              />

              <textarea
                value={product.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="
                  w-full rounded-xl border border-slate-200
                  p-3 text-sm bg-white/90
                  focus:outline-none focus:ring-2 focus:ring-peachSoft
                "
                rows={4}
                placeholder="Опис товару"
              />

              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={product.is_available}
                  onChange={(e) =>
                    handleChange("is_available", e.target.checked)
                  }
                />
                Товар доступний
              </label>
            </div>
          </CardContent>

          {/* Кнопки */}
          <div className="border-t border-slate-200 p-4 flex justify-between">
            <Button variant="danger" onClick={handleDelete}>
              <Trash2 size={16} className="mr-1" />
              Видалити
            </Button>

            <Button variant="primary" onClick={handleSave}>
              <Save size={16} className="mr-1" />
              Зберегти
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
