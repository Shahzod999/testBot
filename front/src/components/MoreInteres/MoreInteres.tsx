import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMenuQuery } from "../../app/api/menuSlice";
import { CompanyState } from "../../app/types/companyType";
import { MenuType } from "../../app/types/menuType";
import FoodBox from "../../pages/Menu/FoodBox/FoodBox";
import "./moreInterest.scss";

const MoreInteres = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const navigate = useNavigate();
  const { data: menuData, isFetching } = useGetMenuQuery({
    company_id: companyInfo?._id,
    limit: 3,
  });

  const [stretch, setStretch] = useState(0);
  const MAX_STRETCH = 1; // Максимальное увеличение (1.5x)

  const containerRef = useRef<HTMLDivElement>(null);
  const nextItemRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = containerRef.current;
    const nextItem = nextItemRef.current;

    if (container && nextItem) {
      const { scrollLeft, scrollWidth, clientWidth } = container;

      const overScroll = scrollLeft + clientWidth - scrollWidth;

      if (overScroll > -100) {
        const stretchFactor = Math.min(1 + overScroll / 100, MAX_STRETCH);
        setStretch(stretchFactor);

        if (stretchFactor >= MAX_STRETCH) {
          navigate("/menu");
        }
      } else if (stretch > 1) {
        setStretch(1);
      }
    }
  };

  if (!companyInfo?.has_menu || menuData?.data?.length == 0) return;
  return (
    <div className="moreInteres">
      <h3>Вам может понравиться</h3>
      <div
        className="moreInteres__wrapper"
        onScroll={handleScroll}
        ref={containerRef}
        style={{ overflowX: "auto", display: "flex", maxWidth: "100%" }} // Горизонтальный скролл
      >
        {menuData?.data?.map((food: MenuType) => (
          <FoodBox food={food} key={food._id} isFetching={isFetching} />
        ))}

        <div
          ref={nextItemRef}
          className="moreInteres__wrapper__next"
          style={{
            transform: `scale(${stretch})`,
            transition: stretch === 1 ? "transform 0.3s ease-out" : "none",
          }}>
          Далее
        </div>
      </div>
    </div>
  );
};

export default MoreInteres;
