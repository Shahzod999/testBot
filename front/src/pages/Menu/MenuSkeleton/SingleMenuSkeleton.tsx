import "./singleMenuSkeleton.scss";

const SingleMenuSkeleton = () => {
  return (
    <div className="single-menu-skeleton">
      {/* Изображение продукта */}
      <div className="single-menu-skeleton__img">
        <div className="skeleton skeleton--image"></div>
      </div>

      {/* Основной блок */}
      <div className="single-menu-skeleton__main">
        <div className="single-menu-skeleton__main__title">
          <div
            className="skeleton skeleton--text"
            style={{ width: "60%", height: "24px" }}></div>
          <div
            className="skeleton skeleton--text"
            style={{ width: "80%", height: "16px", marginTop: "8px" }}></div>
          <div
            className="skeleton skeleton--price"
            style={{ width: "40%", height: "20px", marginTop: "16px" }}></div>
        </div>

        <div className="single-menu-skeleton__main__divider"></div>
      </div>

      {/* Список похожих продуктов */}
      <div className="single-menu-skeleton__similar-prod">
        <div
          className="skeleton skeleton--text"
          style={{ width: "50%", height: "22px", marginBottom: "16px" }}></div>
        <div className="single-menu-skeleton__similar-prod__box">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="single-menu-skeleton__similar-prod__item">
              <div className="skeleton skeleton--image"></div>
              <div
                className="skeleton skeleton--text"
                style={{
                  width: "70%",
                  height: "16px",
                  marginTop: "8px",
                }}></div>
              <div
                className="skeleton skeleton--text"
                style={{
                  width: "50%",
                  height: "14px",
                  marginTop: "4px",
                }}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleMenuSkeleton;
