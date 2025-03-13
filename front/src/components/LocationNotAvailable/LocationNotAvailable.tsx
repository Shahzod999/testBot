import { ReactSVG } from "react-svg";
import { useLocation } from "../../app/utils/locationUtils";
import { useTranslation } from "react-i18next";
import "./style.scss";
import { webLocation } from "./WebLocation";

const LocationNotAvailable = () => {
  const { handleLocation } = useLocation();
  const { t } = useTranslation();
  const getLocation = webLocation();

  const tg = window?.Telegram?.WebApp;

  const handleGetLocation = () => {
    if (tg.platform == "ios" || tg.platform == "android") {
      handleLocation("accessByButton");
    } else {
      getLocation();
    }
  };

  return (
    <div className="distance--warning" onClick={handleGetLocation}>
      <ReactSVG src="./warning.svg" />
      <span className="warningText">{t("turnOnlocation")}!</span>
    </div>
  );
};

export default LocationNotAvailable;
