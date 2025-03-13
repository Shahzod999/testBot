import { ReactSVG } from "react-svg";
import { useLocation } from "../../app/utils/locationUtils";
import { useTranslation } from "react-i18next";
import { setuserLocation } from "../../app/features/userLocationSlice";
import { infoToast } from "../../app/features/toastSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import "./style.scss";

const LocationNotAvailable = () => {
  const { handleLocation } = useLocation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const tg = window?.Telegram?.WebApp;

  const handleGetLocation = () => {
    if (tg.platform == "ios" || tg.platform == "android") {
      return handleLocation("accessByButton");
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            setuserLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            }),
          );
        },
        (error) => {
          dispatch(infoToast(t("errorGeolocation")));
          console.error(t("errorGeolocation"), error);
        },
      );
    } else {
      console.error("Геолокация не поддерживается");
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
