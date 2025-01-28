import { useParams } from "react-router-dom";
import "./singleMenu.scss";
import { useGetSingleProdQuery } from "../../../app/api/menuSlice";
import { getValidatedUrl } from "../../../hooks/imgGetValidatedUrl";
import FoodBox from "../FoodBox/FoodBox";
import { useTranslation } from "react-i18next";
import SingleMenuSkeleton from "../MenuSkeleton/SingleMenuSkeleton";
import { useEffect } from "react";

const SingleMenu = () => {
  const { t } = useTranslation();

  const { id } = useParams();
  const { data, isLoading } = useGetSingleProdQuery(id);

  const singleProd = data?.data;

   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [isLoading]);

  if (isLoading) return <SingleMenuSkeleton />;
  if (!singleProd) return null;
  return (
    <div className="singleMenu">
      <div className="singleMenu__img">
        <img
          src={getValidatedUrl(singleProd.image)}
          alt={t("productImageAlt")}
        />
      </div>
      <div className="singleMenu__main">
        <div className="singleMenu__main__title">
          <div className="singleMenu__main__title__pading">
            <h2>{singleProd.name}</h2>
            <p>{singleProd.description}</p>
          </div>

          <strong>
            {singleProd.price} {singleProd.currency}
          </strong>
          <div className="singleMenu__main__devider"></div>
        </div>

        {/* <div className="singleMenu__main__category">
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
        </div> */}
      </div>

      <div className="singleMenu__similarProd">
        <h2>{t("similarProducts")}</h2>
        <div className="singleMenu__similarProd__box">
          {singleProd.similar_products.map((food) => (
            <FoodBox food={food} key={food._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleMenu;
