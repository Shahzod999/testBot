import { CategoryType } from "../../app/types/menuType";

interface CategoryProps {
  category: CategoryType[];
  activeCategory: CategoryType;
  setActiveCategory: (i: CategoryType) => void;
}

const Category = ({
  category,
  activeCategory,
  setActiveCategory,
}: CategoryProps) => {
  const handleCategory = (i: CategoryType) => {
    setActiveCategory(i);
  };

  return (
    <div className="category">
      {category?.map((item, index) => (
        <span
          className={`category__text ${
            activeCategory?.name == item.name ? "category__text__active" : ""
          }`}
          onClick={() => handleCategory(item)}
          key={index}>
          {item.name}
        </span>
      ))}
    </div>
  );
};

export default Category;
