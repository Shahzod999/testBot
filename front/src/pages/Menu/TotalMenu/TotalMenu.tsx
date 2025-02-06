import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectedCompany } from "../../../app/features/companyStateSlice";
import {
  useGetCategoryQuery,
  useGetMenuQuery,
} from "../../../app/api/menuSlice";
import Category from "../Category";
import FoodBox from "../FoodBox/FoodBox";
import RaitingStars from "../../../components/raiting/RaitingStars";
import { MenuType } from "../../../app/types/menuType";
import "./totalMenu.scss";
import { ReactSVG } from "react-svg";
import { useTranslation } from "react-i18next";
import MenuSkeleton from "../MenuSkeleton/MenuSkeleton";

const TotalMenu = () => {
  const { t } = useTranslation();
  const companyInfo = useAppSelector(selectedCompany);

  const { data: categoryname } = useGetCategoryQuery({
    company_id: companyInfo?._id,
  });

  const category = categoryname?.data || [];

  const [activeCategory, setActiveCategory] = useState(
    () => category[0] || null,
  );

  if (!activeCategory && category.length > 0) {
    setActiveCategory(category[0]);
  }

  const {
    data: menuData,
    isLoading,
    isFetching,
  } = useGetMenuQuery(
    {
      company_id: companyInfo?._id,
      category_id: activeCategory?._id,
    },
    { skip: !activeCategory },
  );

  
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [isLoading, isFetching]);

  if (isLoading) return <MenuSkeleton />;

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
          category={category}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>

      <div className="menu__categoryName">
        <h2>{activeCategory?.name || t("selectCategory")}</h2>
      </div>

      <div className="menu__food">
        {menuData?.data?.map((food: MenuType, index: number) => (
          <div
            key={food._id}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
            className="menu__food-item">
            <FoodBox food={food} isFetching={isFetching} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalMenu;
