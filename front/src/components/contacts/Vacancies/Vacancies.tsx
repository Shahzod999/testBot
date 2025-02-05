import Lottie from "lottie-react";
import notFound from "../../../../public/notFound.json";
import { useTranslation } from "react-i18next";

const Vacancies = () => {
  const { t } = useTranslation();
  return (
    <div className="socialMedia">
      <h3>{t("vacancies")}</h3>
      <Lottie animationData={notFound} />
    </div>
  );
};

export default Vacancies;
