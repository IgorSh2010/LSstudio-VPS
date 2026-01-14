import { useState, useRef } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/input";
import { addProduct } from "../api/products";
import { Trash2, Plus } from "lucide-react";
import Modal  from "../components/Modal";
import { useNavigate } from "react-router-dom";

export default function AddProductForm({ onProductAdded }) {
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const initialFormState = {
                            name: "",
                            category: "",
                            description: "",
                            price: "",
                            images: [],
                            sizes: [],
                            bestseller: false,
                            featured: false,
                            available: true,
                            };
  const [form, setForm] = useState(initialFormState);
  const [previews, setPreviews] = useState([]);
  const navigate = useNavigate();

  const resetForm = () => {
  // очищаємо blob URLs
  previews.forEach((url) => URL.revokeObjectURL(url));

  setForm(initialFormState);
  setPreviews([]);
};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSizes = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (!value) return;

      setForm((prev) => ({
        ...prev,
        sizes: [...prev.sizes, value],
      }));
      e.target.value = "";
    }
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setForm((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
    }));

    setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
            for (const key in form) {
            if (key === "images") {
                for (let img of form.images) formData.append("images", img);
            } else {
                formData.append(key, form[key]);
            }
        }

        try {
            await addProduct(formData);                   
            resetForm();
            setOpen(false);
            setModalMessage("Товар успішно доданий!");
        } catch (error) {
        } finally {
            setLoading(false);
            if (onProductAdded) {onProductAdded();}            
        }        
    };

  return (
    <>
    <Card data-slot="add-product-form" className="border-border shadow-sm md:col-span-2 bg-bgSecondary/80">
      <CardContent className="p-8">
        <div
          className="flex items-center gap-2 text-pink-600 cursor-pointer"
          onClick={() => {if (open) resetForm();
                          setOpen((v) => !v);
                         }}
        >
          <Plus size={20} className={`transition-transform ${open ? "rotate-45" : ""}`} />
          <h2 className="text-lg font-medium">
            {open ? "Відміна" : "Додати новий товар"}
          </h2>
        </div>

        <div
          className={`
            transition-all duration-300 ease-in-out overflow-hidden
            ${open ? "max-h-[900px] opacity-100 mt-2" : "max-h-0 opacity-0"}
          `}
        >
          <div className="grid md:grid-cols-2 gap-4 m-2">
            <Input name="name" placeholder="Назва товару" value={form.name} onChange={handleChange} />
            <Input name="category" placeholder="Категорія" value={form.category} onChange={handleChange} />
            <Input name="price" type="number" placeholder="Ціна" value={form.price} onChange={handleChange} />
            <Input placeholder="Розмір (Enter)" onKeyDown={handleSizes} />

            <textarea
              name="description"
              placeholder="Опис товару"
              value={form.description}
              onChange={handleChange}
              className="md:col-span-2 min-h-[100px] rounded-md border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-pink-400"
            />
          </div>
          
          <div className="mt-6"> 
            <label className="block text-sm font-medium mb-2 text-textSecondary">Статуси</label>
            <div className="flex flex-wrap gap-6 mt-4 text-sm">
                {[
                ["bestseller", "Bestseller"],
                ["featured", "Рекомендований"],
                ["available", "Доступний"],
                ].map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input
                    type="checkbox"
                    name={key}
                    checked={form[key]}
                    onChange={handleChange}
                    className="accent-textSecondary w-4 h-4"
                  />
                  <span>{label}</span>
                </label>
                ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2 text-slate-500">
                Зображення товару
            </label>

            <div className="flex flex-wrap gap-3">
                {previews.map((img, i) => (
                <div
                    key={i}
                    className="relative w-24 h-24 border border-slate-300 rounded-lg overflow-hidden group bg-white"
                >
                    <img
                    src={img}
                    alt={`preview-${i}`}
                    className="object-cover w-full h-full"
                    />

                    <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="
                        absolute top-1 right-1
                        bg-black/60 hover:bg-rose-600
                        text-white p-1 rounded
                        opacity-0 group-hover:opacity-100
                        transition
                    "
                    >
                    <Trash2 size={14} />
                    </button>
                </div>
                ))}

                {/* Кнопка додавання */}
                <div
                onClick={() => fileInputRef.current.click()}
                className="
                    w-24 h-24 flex items-center justify-center
                    border-2 border-dashed border-pink-300
                    text-pink-400 hover:border-pink-500 hover:text-pink-500
                    rounded-lg cursor-pointer transition
                    bg-pink-50/30
                "
                >
                <Plus size={18} />
                </div>

                <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImages}
                className="hidden"
                />
            </div>
          </div>

          <Button variant="primary" 
                  type="submit" 
                  className="mt-6"
                  disabled={loading}
                  onClick={handleSubmit}>
            {loading ? "Збереження..." : "Зберегти товар до бази"}
          </Button>
        </div>
      </CardContent>
    </Card>

    {modalMessage && (
      <Modal message={modalMessage} onClose={() => {
        setModalMessage(null);
        if (modalMessage == null) {
          navigate("/");
        }
      }} />
    )}
  </>
  );
}
