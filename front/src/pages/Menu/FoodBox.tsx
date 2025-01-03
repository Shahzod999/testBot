import { Link } from "react-router-dom";

const FoodBox = ({ food }: any) => {
  const { price, text, weight, img } = food;

  return (
    <Link to="1" className="menu__food__box">
      <div className="menu__food__box__img">
        <img src={img} alt="" />
      </div>
      <div className="menu__food__box__text">
        <strong>{price}so`m</strong>
        <p>{text}</p>
        <span>{weight}</span>
      </div>
    </Link>
  );
};

export default FoodBox;
