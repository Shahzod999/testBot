import { Link } from "react-router-dom";
import { getValidatedUrl } from "../../../hooks/imgGetValidatedUrl";
import FoodBoxSkeleton from "../MenuSkeleton/FoodBoxSkeleton";

const FoodBox = ({ food, isFetching }: any) => {
  const { _id, name, price, currency, description, weight, image } = food;

  console.log(name);

  if (isFetching) return <FoodBoxSkeleton />;

  return (
    <Link to={`/menu/${_id}`} className="menu__food__box">
      <div className="menu__food__box__img">
        <img src={getValidatedUrl(image)} alt="" />
      </div>
      <div className="menu__food__box__text">
        <h4>{name}</h4>
        <p>{description}</p>
        <strong>
          {price} {currency}
        </strong>
      </div>
    </Link>
  );
};

export default FoodBox;
