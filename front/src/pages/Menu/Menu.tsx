import { ReactSVG } from "react-svg";
import { selectedCompany } from "../../app/features/companyStateSlice";
import RaitingStars from "../../components/raiting/RaitingStars";
import { useAppSelector } from "../../hooks/reduxHooks";
import "./menu.scss";
import Category from "./Category";
import { useState } from "react";
import FoodBox from "./FoodBox";
const Menu = () => {
  const category = ["Завтраки", "Круассаны", "Салаты", "Супы", "Паста"];
  const [activeCategory, setActiveCategory] = useState(category[0]);
  const companyInfo = useAppSelector(selectedCompany);


  const food = {
    img: "./defaultMain.jpg",
    price: "28000",
    text: "Сэндвич - круассан с говяжьей ветчиной",
    weight: "250 гр",
  };

  if (!companyInfo) return;
  return (
    <div className="menuWrapper">
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
              <span>{companyInfo.review_count} отзывов</span>
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
          <h2>{activeCategory}</h2>
        </div>

        <div className="menu__food">
          <FoodBox food={food} />
          <FoodBox food={food} />

          <FoodBox food={food} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
