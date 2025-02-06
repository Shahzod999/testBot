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
  const [moreWidth, setMoreWidth] = useState(50); // Начальная ширина блока
  const [textScale, setTextScale] = useState(1); // Масштаб текста

  const THRESHOLD = 150; // Порог для активации увеличения и редиректа
  const EXPAND_SIZE = 120; // Максимальный размер кнопки перед редиректом
  const TEXT_MAX_SCALE = 1.5; // Максимальный размер текста

  const handleScroll = () => {
    if (!wrapperRef.current || !moreRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = wrapperRef.current;
    const maxScroll = scrollWidth - clientWidth;

    if (scrollLeft >= maxScroll) {
      const extraScroll = Math.min(scrollLeft - maxScroll, THRESHOLD);
      const newWidth = 50 + (extraScroll / THRESHOLD) * (EXPAND_SIZE - 50);
      const newScale = 1 + (extraScroll / THRESHOLD) * (TEXT_MAX_SCALE - 1);
      setMoreWidth(newWidth);
      setTextScale(newScale);

      if (extraScroll >= THRESHOLD) {
        navigate("/menu");
      }
    } else {
      setMoreWidth(50);
      setTextScale(1);
    }
  };

  return (
    <div className="moreInteres">
      <h3>Вам может понравиться</h3>

      <div
        className="moreInteres__wrapper"
        ref={wrapperRef}
        onScroll={handleScroll}>
        {menuData?.data?.map((food: MenuType) => (
          <FoodBox food={food} key={food._id} isFetching={isFetching} />
        ))}

        <div
          ref={moreRef}
          className="menu__food__box"
          style={{
            width: `${moreWidth}px`,
            transform: `scale(${textScale})`,
          }}>
          <div
            className="menu__food__box__more"
            style={{ transform: `scale(${textScale})` }}>
            {t("more")}...
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInteres;
