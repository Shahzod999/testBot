import "./menuSkeleton.scss";

const CategorySkeleton = () => {
  return (
    <div className="menu-skeleton">
      <div className="menu-skeleton__categories">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="skeleton skeleton--category"
            style={{ width: "80px", height: "28px" }}></div>
        ))}
      </div>
    </div>
  );
};

export default CategorySkeleton;
