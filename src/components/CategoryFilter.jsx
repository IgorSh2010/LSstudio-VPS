const CategoryFilter = ({ categories, selectedCategory, onSelect, products }) => {
  // Підрахунок товарів у кожній категорії
  const getCount = (category) => {
    return products.filter((p) => p.category === category).length;
  };

  return (
    <div className="mt-4 overflow-x-auto max-w-screen overflow-hidden">
      <div className="flex gap-2 min-w-max w-full pb-2 transition-all hide-scrollbar">
        {/* Кнопка "Wszystkie" */}
        <button
          onClick={() => onSelect(null)}
          className={`whitespace-nowrap px-3 py-1 rounded transition-all duration-300 transform ${
            !selectedCategory
              ? 'bg-pink-500 text-white scale-105 shadow-md'
              : 'bg-pink-200 text-gray-700 hover:bg-pink-300'
          }`}
        >
          Wszystkie ({products.length})
        </button>

        {/* Кнопки категорій */}
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`whitespace-nowrap px-3 py-1 rounded transition-all duration-300 transform ${
              selectedCategory === cat
                ? 'bg-pink-500 text-white scale-105 shadow-md'
                : 'bg-pink-200 text-gray-700 hover:bg-pink-300'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)} ({getCount(cat)})
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;