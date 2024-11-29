import { useState } from "react";
import "./mainInfo.scss";
import { GoBookmark } from "react-icons/go";
import { GoBookmarkFill } from "react-icons/go";
import { CompanyState } from "../../app/types/companyType";
import ActionButtons from "./ActionButtons";

const MainInfo = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const [bookMark, setBookMark] = useState(false);

  const toggleBookMark = () => {
    setBookMark(!bookMark);
  };

  return (
    <div className="mainInfo">
      <div className="mainInfo__logo">
        <div className="mainInfo__logo__img">
          <img src={companyInfo.logoThumbnail} alt="logo" />
        </div>
        <div className="mainInfo__logo__name">
          <h2>{companyInfo.name}</h2>
          <span>{companyInfo.type}</span>
        </div>

        <span onClick={toggleBookMark} className="mainInfo__logo__bookMark">
          {bookMark ? <GoBookmarkFill /> : <GoBookmark />}
        </span>
      </div>
      <p className="mainInfo__shortText">Коротко о заведении</p>

      <div className="mainInfo__openHours">
        <div className="mainInfo__openHours__left">
          <span>Открыто</span>
          <p>До 22:00</p>
        </div>
        <div className="mainInfo__openHours__divider">
          <div></div>
        </div>
        <div className="mainInfo__openHours__right">
          <span>Расстояние</span>
          <p>{companyInfo.distance}</p>
        </div>
      </div>

      <button className="mainInfo__orderbutton">
        <svg width="30" height="29" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.75446 18.755H16.6138C18.0678 18.755 18.9115 17.9113 18.9115 16.2991V8.50198C18.9115 6.88981 18.0603 6.04606 16.433 6.04606H15.3708C15.3331 4.35856 13.8942 2.95734 12.0937 2.95734C10.3008 2.95734 8.85434 4.35856 8.81668 6.04606H7.75446C6.12722 6.04606 5.27594 6.88981 5.27594 8.50198V16.2991C5.27594 17.9113 6.12722 18.755 7.75446 18.755ZM12.0937 4.29076C13.1258 4.29076 13.8867 5.06671 13.9168 6.04606H10.2706C10.3008 5.06671 11.0617 4.29076 12.0937 4.29076Z"
            fill="white"
          />
        </svg>
        Заказать
      </button>

      <div className="actionButtons">
        <ActionButtons text="Такси" icon="./car.fill.svg" />
        <ActionButtons text="Чат" icon="./message.fill.svg" />
        <ActionButtons text="Маршрут" icon="./map.fill.svg" />
        <ActionButtons text="Поделиться" icon="./Icon.svg" />
      </div>
    </div>
  );
};

export default MainInfo;
