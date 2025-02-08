import "./menuSkeleton.scss";

const MenuSkeleton = () => {
  return (
    <div className="menu-skeleton">
      {/* Заголовок */}
      {/* <div className="menu-skeleton__title">
        <div
          className="skeleton skeleton--text"
          style={{ width: "80%", height: "20px" }}></div>
      </div> */}

      {/* Основная информация */}
      {/* <div className="menu-skeleton__header">
        <div className="menu-skeleton__header__title">
          <div
            className="skeleton skeleton--text"
            style={{ width: "60%", height: "28px" }}></div>
          <div className="menu-skeleton__header__rating">
            <div
              className="skeleton skeleton--star"
              style={{ width: "80px", height: "16px" }}></div>
            <div
              className="skeleton skeleton--text"
              style={{ width: "40px", height: "16px" }}></div>
          </div>
        </div>
        <div className="menu-skeleton__symbol">
          <div
            className="skeleton skeleton--circle"
            style={{ width: "40px", height: "40px" }}></div>
        </div>
      </div> */}

      {/* Активная категория */}
      <div className="menu-skeleton__category-name">
        <div
          className="skeleton skeleton--text"
          style={{ width: "50%", height: "22px" }}></div>
      </div>

      {/* Список блюд */}
      <div className="menu-skeleton__food">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="menu-skeleton__food__item">
            <div
              className="skeleton skeleton--image"
              style={{ width: "100%", height: "132px" }}></div>
            <div
              className="skeleton skeleton--text"
              style={{ width: "80%", height: "16px", marginTop: "8px" }}></div>
            <div
              className="skeleton skeleton--text"
              style={{ width: "60%", height: "14px", marginTop: "4px" }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSkeleton;
