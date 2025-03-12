import { useParams } from "react-router-dom";
import "./singleMenu.scss";
import { useGetSingleProdQuery } from "../../../app/api/menuSlice";
import { getValidatedUrl } from "../../../hooks/imgGetValidatedUrl";
import FoodBox from "../FoodBox/FoodBox";
import { useTranslation } from "react-i18next";
import SingleMenuSkeleton from "../MenuSkeleton/SingleMenuSkeleton";
import { useEffect } from "react";
import NotFoundPage from "../../SmallPages/404/NotFoundPage";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectedCompanyId } from "../../../app/features/getCompanyIdSlice";
import { formatPrice, newCurrency } from "../../../app/utils/priceFormat";

const SingleMenu = () => {
  const { t } = useTranslation();

  const { id } = useParams();
  const companyId = useAppSelector(selectedCompanyId);
  const { data, isLoading, isFetching } = useGetSingleProdQuery({
    id,
    companyId,
  });

  const singleProd = data?.data;

  useEffect(() => {
    const root = document.getElementById("root")!;
    root.scrollTo({ top: 0, behavior: "smooth" });
  }, [singleProd]);

  if (isLoading) return <SingleMenuSkeleton />;
  if (!singleProd) return <NotFoundPage />;
  return (
    <div className="singleMenu">
      {isFetching ? (
        <SingleMenuSkeleton />
      ) : (
        <>
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
                {formatPrice(singleProd.price)}{" "}
                {newCurrency(singleProd.currency)}
              </strong>
              <div className="singleMenu__main__devider"></div>
            </div>
          </div>
        </>
      )}

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
