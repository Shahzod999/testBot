const FoodBox = ({ food }: any) => {
  const { price, text, weight, img } = food;

  return (
    <div className="menu__food__box">
      <div className="menu__food__box__img">
        <img src={img} alt="" />
      </div>
      <div className="menu__food__box__text">
        <strong>{price}so`m</strong>
        <p>{text}</p>
        <span>{weight}</span>
      </div>
    </div>
  );
};

export default FoodBox;
