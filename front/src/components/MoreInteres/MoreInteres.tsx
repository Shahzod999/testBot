import { useRef } from "react";
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
    limit: 4,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const isEnd = Math.abs(scrollLeft + clientWidth - scrollWidth) < 5; // Погрешность 5px

      if (isEnd) {
        navigate("/menu");
      }
    }
  };

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
      </div>
    </div>
  );
};

export default MoreInteres;
