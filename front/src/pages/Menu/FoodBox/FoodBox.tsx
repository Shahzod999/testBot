import { Link } from "react-router-dom";
import { getValidatedUrl } from "../../../hooks/imgGetValidatedUrl";
import FoodBoxSkeleton from "../MenuSkeleton/FoodBoxSkeleton";
import { formatPrice } from "../../../app/utils/priceFormat";

const FoodBox = ({ food, isFetching }: any) => {
  const { _id, name, price, currency, description, image, discount } = food;

  let newCurreny = currency == "UZS" ? "SO`M" : currency;

  if (isFetching) return <FoodBoxSkeleton />;

  return (
    <Link to={`/menu/${_id}`} className="menu__food__box">
      <div className="menu__food__box__img">
        <img src={getValidatedUrl(image)} alt="" />
      </div>
      <div className="menu__food__box__text">
        <h4>{name}</h4>
        <p>{description}</p>
        {discount && (
          <strong className="menu__food__box__text__discount">
            {formatPrice(discount.price)} {currency.toLowerCase()}
          </strong>
        )}
        {price && (
          <strong
            className={`menu__food__box__text__price ${
              discount && "menu__food__box__text__oldPrice"
            }`}>
            {formatPrice(price)} {newCurreny.toLowerCase()}
          </strong>
        )}
      </div>
    </Link>
  );
};

export default FoodBox;
