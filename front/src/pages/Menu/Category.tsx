import { CategoryType } from "../../app/types/menuType";
import CategorySkeleton from "./MenuSkeleton/CategorySkeleton";
import { useRef, useEffect } from "react";

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
  const categoryContainerRef = useRef<HTMLDivElement>(null);

  // Функция для центрирования активной категории
  const centerActiveCategory = () => {
    setTimeout(() => {
      const container = categoryContainerRef.current;
      const selectedItem = document.querySelector(
        `.category__text.category__text__active`,
      );

      if (container && selectedItem) {
        const containerWidth = container.offsetWidth;
        const itemWidth = selectedItem.clientWidth;
        const itemLeft = (selectedItem as HTMLElement).offsetLeft;

        // Вычисляем позицию прокрутки для центрирования
        const scrollPosition = itemLeft - containerWidth / 2 + itemWidth / 2;

        // Плавная прокрутка к этой позиции
        container.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }, 10);
  };

  // Центрирование при изменении активной категории или загрузке компонента
  useEffect(() => {
    if (activeCategory && !isFetching) {
      centerActiveCategory();
    }
  }, [activeCategory, isFetching, category]);

  const handleCategory = (i: CategoryType) => {
    setActiveCategory(i.name);

    // Центрирование категории в списке
    centerActiveCategory();

    // Прокрутка к контенту категории
    const targetElement = document.getElementById(i.name);

    if (targetElement) {
      const root = document.getElementById("root")!;
      const elementPosition =
        targetElement.getBoundingClientRect().top + root.scrollTop;
      const offset = 130;

      root.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  if (isFetching) return <CategorySkeleton />;
  return (
    <div className="category" ref={categoryContainerRef}>
      {category?.map((item, index) => (
        <span
          className={`category__text ${
            activeCategory == item.name ? "category__text__active" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            handleCategory(item);
          }}
          key={index}>
          {item.name}
        </span>
      ))}
    </div>
  );
};

export default Category;
