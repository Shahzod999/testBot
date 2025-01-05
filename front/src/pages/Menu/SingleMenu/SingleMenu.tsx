import { useParams } from "react-router-dom";
import "./singleMenu.scss";

const SingleMenu = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="singleMenu">
      <div className="singleMenu__img">
        <img src="./defaultMain.jpg" alt="" />
      </div>
      <div className="singleMenu__main">
        <div className="singleMenu__main__title">
          <div className="singleMenu__main__title__pading">
            <h2>Сендвич - круассан с говяжьей ветчиной</h2>
            <p>
              Круассан с говяжей ветчиной, тонко нарезанными помидорами и свежим
              салатным листом.
            </p>
          </div>

          <strong>28 000 сум</strong>
          <div className="singleMenu__main__devider"></div>
        </div>

        <div className="singleMenu__main__category">
          <span>Картофель</span>
          <p>Картошка фри</p>
          <div className="singleMenu__main__devider"></div>
          <p>Картофель по деревенски</p>
          <div className="singleMenu__main__devider"></div>
        </div>

        <div className="singleMenu__main__category">
          <span>Напитки</span>
          <p>Anor Su</p>
          <div className="singleMenu__main__devider"></div>
          <p>Fresh Malina</p>
          <div className="singleMenu__main__devider"></div>
        </div>
      </div>

      <div className="singleMenu__similarProd">
        <h2>Похожие продукты</h2>
        {/* <div className="singleMenu__similarProd__box">
          <FoodBox food={food} />
          <FoodBox food={food} />
          <FoodBox food={food} />
          <FoodBox food={food} />
        </div> */}
      </div>
    </div>
  );
};

export default SingleMenu;
