import { Link } from "react-router-dom";
import { getValidatedUrl } from "../../../hooks/imgGetValidatedUrl";

const FoodBox = ({ food }: any) => {
  const { _id, price, currency, description, weight, image } = food;

  return (
    <Link to={`/menu/${_id}`} className="menu__food__box">
      <div className="menu__food__box__img">
        <img src={getValidatedUrl(image)} alt="" />
      </div>
      <div className="menu__food__box__text">
        <strong>
          {price} {currency}
        </strong>
        <p>{description}</p>
        <span>{weight}</span>
      </div>
    </Link>
  );
};

export default FoodBox;
