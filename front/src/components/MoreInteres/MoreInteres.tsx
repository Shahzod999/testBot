import { useNavigate } from "react-router-dom";
import { useGetMenuQuery } from "../../app/api/menuSlice";
import { CompanyState } from "../../app/types/companyType";
import { MenuType } from "../../app/types/menuType";
import FoodBox from "../../pages/Menu/FoodBox/FoodBox";
import "./moreInterest.scss";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";

const MoreInteres = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: menuData, isFetching } = useGetMenuQuery({
    company_id: companyInfo?._id,
    limit: 5,
  });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState<number | null>(null);
  const [moreWidth, setMoreWidth] = useState(50); // Начальная ширина блока

  const THRESHOLD = 150; // Порог для редиректа

  // Обработчик начала свайпа
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  // Обработчик движения пальцем
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startX) return;
    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;

    if (diffX > 0) {
      setMoreWidth(50 + diffX); // Увеличиваем ширину "more" относительно движения
    }

    if (diffX > THRESHOLD) {
      navigate("/menu");
    }
  };

  // Обработчик завершения свайпа (возвращаем блок к нормальной ширине)
  const handleTouchEnd = () => {
    setMoreWidth(50);
    setStartX(null);
  };

  return (
    <div className="moreInteres">
      <h3>Вам может понравиться</h3>

      <div
        className="moreInteres__wrapper"
        ref={wrapperRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        {menuData?.data?.map((food: MenuType) => (
          <FoodBox food={food} key={food._id} isFetching={isFetching} />
        ))}

        <div
          ref={moreRef}
          className="menu__food__box"
          style={{ width: `${moreWidth}px` }}>
          <div className="menu__food__box__more">{t("more")}...</div>
        </div>
      </div>
    </div>
  );
};

export default MoreInteres;
