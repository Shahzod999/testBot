import Lottie from "lottie-react";
import notFound from "../../../../public/404Not.json";
import "./notFoundPage.scss";
import CommonButton from "../../../components/Actions/CommonButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLink = () => {
    navigate("/");
  };

  return (
    <div className="notFoundPage">
      <div className="notFoundPage__sticker">
        <div className="notFoundPage__sticker__box">
          <div className="notFoundPage__sticker__box__img">
            <Lottie animationData={notFound} />
          </div>

          <h2>{t("notFound")}</h2>
        </div>
      </div>

      <div className="notFoundPage__button">
        <CommonButton createdFunction={handleLink}>{t("goHome")}</CommonButton>
      </div>
    </div>
  );
};

export default NotFoundPage;
