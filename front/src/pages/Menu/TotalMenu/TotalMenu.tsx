import { useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectedCompany } from "../../../app/features/companyStateSlice";
import {
  useGetCategoryQuery,
  useGetMenuQuery,
} from "../../../app/api/menuSlice";
import Category from "../Category";
import FoodBox from "../FoodBox/FoodBox";
import RaitingStars from "../../../components/raiting/RaitingStars";
import { CategoryType, MenuType } from "../../../app/types/menuType";
import "./totalMenu.scss";
import { ReactSVG } from "react-svg";
import { useTranslation } from "react-i18next";
import MenuSkeleton from "../MenuSkeleton/MenuSkeleton";

const TotalMenu = () => {
  const { t } = useTranslation();
  const companyInfo = useAppSelector(selectedCompany);

  const { data: categoryname, isLoading } = useGetCategoryQuery(
    {
      company_id: companyInfo?._id,
    },
    { skip: !companyInfo },
  );

  const categories = categoryname?.data || [];
  const [loadedCategories, setLoadedCategories] = useState<CategoryType[]>([]);
  const [activeCategoryName, setActiveCategoryName] = useState<string | null>(
    null,
  );
  const observer = useRef<IntersectionObserver | null>(null);

  const lastCategoryRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          loadedCategories.length < categories.length
        ) {
          loadNextCategory();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadedCategories, categories],
  );

  const loadNextCategory = () => {
    if (categories.length > loadedCategories.length) {
      const nextCategory = categories[loadedCategories.length];
      setLoadedCategories((prev) => [...prev, nextCategory]);
    }
  };

  useEffect(() => {
    if (categories.length && loadedCategories.length === 0) {
      loadNextCategory();
    }
  }, [categories]);

  useEffect(() => {
    const categoryElements = document.querySelectorAll(".menu__categoryName");

    const categoryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategoryName(entry.target.id); // Устанавливаем активную категорию
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -80% 0px", // Смещение, чтобы категория менялась чуть раньше
        threshold: 0.1, // Срабатывает, когда 10% элемента видимо
      },
    );

    categoryElements.forEach((el) => categoryObserver.observe(el));

    return () => {
      categoryElements.forEach((el) => categoryObserver.unobserve(el));
    };
  }, [loadedCategories]);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log(activeCategoryName);

  if (!companyInfo || !categoryname) return null;

  return (
    <div className="menu">
      <div className="menu__title">
        <h2>{companyInfo.street_address}</h2>
      </div>

      <div className="menu__header">
        <div className="menu__header__title">
          <h2>{companyInfo.name}</h2>

          <div className="menu__header__title__raiting">
            <div className="raiting__set">
              <RaitingStars count={companyInfo.rating} />
            </div>
            <span>{t("reviews", { count: companyInfo.review_count })}</span>
          </div>
        </div>

        <span className="symbol">
          <ReactSVG src="./menu/symbol.svg" />
        </span>
      </div>

      <div className="categorySticky">
        <h4 className={`stickyTitle${isScrolled ? "__active" : "__closed"}`}>
          {companyInfo.name}
        </h4>

        <Category
          category={categories}
          activeCategory={activeCategoryName || ""}
          setActiveCategory={setActiveCategoryName}
          isFetching={isLoading}
        />
      </div>

      {loadedCategories.map((category: CategoryType, index: number) => (
        <div
          key={category._id}
          ref={index === loadedCategories.length - 1 ? lastCategoryRef : null}>
          <CategoryProducts
            companyId={companyInfo._id}
            categoryId={category._id}
            categoryName={category.name}
          />
        </div>
      ))}
    </div>
  );
};

interface CategoryProductsProps {
  companyId: string;
  categoryId: string;
  categoryName: string;
}

const CategoryProducts = ({
  companyId,
  categoryId,
  categoryName,
}: CategoryProductsProps) => {
  const {
    data: menuData,
    isFetching,
    isLoading,
    isError,
  } = useGetMenuQuery({
    company_id: companyId,
    category_id: categoryId,
  });

  if (isLoading || isError) return <MenuSkeleton />;

  return (
    <>
      <h2 className="menu__categoryName" id={categoryName}>
        {categoryName}
      </h2>
      <div className="menu__food">
        {menuData?.data?.map((food: MenuType, index: number) => (
          <div
            key={food._id}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
            className="menu__food-item">
            <FoodBox key={food._id} food={food} isFetching={isFetching} />
          </div>
        ))}
      </div>
    </>
  );
};

export default TotalMenu;
