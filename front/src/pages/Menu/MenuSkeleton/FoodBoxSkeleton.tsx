import "./foodBoxSkeleton.scss";

const FoodBoxSkeleton = () => {
  return (
    <div className="food-box-skeleton">
      <div className="food-box-skeleton__img">
        <div className="skeleton skeleton--image"></div>
      </div>

      <div className="food-box-skeleton__text">
        <div
          className="skeleton skeleton--price"
          style={{ width: "50%", height: "16px" }}></div>
        <div
          className="skeleton skeleton--description"
          style={{ width: "70%", height: "14px", marginTop: "8px" }}></div>
        <div
          className="skeleton skeleton--weight"
          style={{ width: "40%", height: "12px", marginTop: "6px" }}></div>
      </div>
    </div>
  );
};

export default FoodBoxSkeleton;
