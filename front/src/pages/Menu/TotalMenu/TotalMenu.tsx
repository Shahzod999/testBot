import { useState } from "react";
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

  const { data: menuData } = useGetMenuQuery(
    {
      company_id: companyInfo?._id,
      category_id: activeCategory?._id,
    },
    { skip: !activeCategory },
  );

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

      <Category
        category={category}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="menu__categoryName">
        <h2>{activeCategory?.name || t("selectCategory")}</h2>
      </div>

      <div className="menu__food">
        {menuData?.data?.map((food: MenuType) => (
          <FoodBox food={food} key={food._id} />
        ))}
      </div>
    </div>
  );
};

export default TotalMenu;
