import { CategoryType } from "../../app/types/menuType";
import CategorySkeleton from "./MenuSkeleton/CategorySkeleton";

interface CategoryProps {
  category: CategoryType[];
  activeCategory: string;
  setActiveCategory: (i: string) => void;
  isFetching: boolean;
}

const Category = ({
  category,
  activeCategory,
  setActiveCategory,
  isFetching,
}: CategoryProps) => {
  const handleCategory = (i: CategoryType) => {
    setActiveCategory(i.name);
  };

  if (isFetching) return <CategorySkeleton />;
  return (
    <div className="category">
      {category?.map((item, index) => (
        <span
          className={`category__text ${
            activeCategory == item.name ? "category__text__active" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            handleCategory(item);

            const targetElement = document.getElementById(item.name);
            if (targetElement) {
              const elementPosition =
                targetElement.getBoundingClientRect().top + window.pageYOffset;
              const offset = 50;

              window.scrollTo({
                top: elementPosition - offset,
                behavior: "smooth",
              });
            }
          }}
          key={index}>
          {item.name}
        </span>
      ))}
    </div>
  );
};

export default Category;
