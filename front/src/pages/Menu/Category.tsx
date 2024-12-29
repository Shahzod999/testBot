interface CategoryProps {
  category: string[];
  activeCategory: string;
  setActiveCategory: (i: string) => void;
}

const Category = ({
  category,
  activeCategory,
  setActiveCategory,
}: CategoryProps) => {
  const handleCategory = (i: string) => {
    setActiveCategory(i);
  };

  return (
    <div className="category">
      {category.map((item) => (
        <span
          className={`category__text ${
            activeCategory == item ? "category__text__active" : ""
          }`}
          onClick={() => handleCategory(item)}>
          {item}
        </span>
      ))}
    </div>
  );
};

export default Category;
