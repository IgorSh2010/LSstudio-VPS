const CategoryFilter = ({ categories, selectedCategory, onSelect, products }) => {
  const getCount = (category) =>
    products.filter((p) => p.category === category).length;

  const base =
    "whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300";

  const active =
    "bg-accentPrimary text-textSecondary shadow-sm scale-[1.04]";

  const inactive =
    "bg-bgSecondary text-[#5A4A4F] border border-border hover:bg-accentPrimaryHover/50 hover:text-textSecondary";

  return (
    <div className="mt-4 overflow-x-auto max-w-screen hide-scrollbar">
      <div className="flex gap-2 min-w-max pb-2">
        {/* Wszystkie */}
        <button
          onClick={() => onSelect(null)}
          className={`${base} ${
            !selectedCategory ? active : inactive
          }`}
        >
          Wszystkie <span className="opacity-70">({products.length})</span>
        </button>

        {/* Kategorie */}
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`${base} ${
              selectedCategory === cat ? active : inactive
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}{" "}
            <span className="opacity-70">({getCount(cat)})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;