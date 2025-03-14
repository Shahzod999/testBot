import { Link } from "react-router-dom";
import { getValidatedUrl } from "../../../hooks/imgGetValidatedUrl";
import FoodBoxSkeleton from "../MenuSkeleton/FoodBoxSkeleton";
import { formatPrice, newCurrency } from "../../../app/utils/priceFormat";
import { useTranslation } from "react-i18next";

const FoodBox = ({ food, isFetching }: any) => {
  const { _id, name, price, currency, description, image, discount, active } =
    food;
  const { t } = useTranslation();

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
            {formatPrice(discount.price)} {newCurrency(currency)}
          </strong>
        )}
        {price && (
          <strong
            className={`menu__food__box__text__price ${
              discount && "menu__food__box__text__oldPrice"
            }`}>
            {formatPrice(price)} {newCurrency(currency)}
          </strong>
        )}
      </div>

      {!active && (
        <div className="menu__food__box--Nonactive">
          <span>{t("outStock")}</span>
        </div>
      )}
    </Link>
  );
};

export default FoodBox;
