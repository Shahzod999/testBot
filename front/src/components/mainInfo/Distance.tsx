import { useTranslation } from "react-i18next";
import { ReactSVG } from "react-svg";
import { CompanyState } from "../../app/types/companyType";
import "./distance.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  selectedUserLocation,
  setuserLocation,
} from "../../app/features/userLocationSlice";
import { infoToast } from "../../app/features/toastSlice";

const Distance = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const { t } = useTranslation();
  const locationUser = useAppSelector(selectedUserLocation);

  const dispatch = useAppDispatch();

  const handleLocation = () => {
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

  if (!locationUser.lat || !locationUser.lon)
    return (
      <div className="distance--warning" onClick={handleLocation}>
        <ReactSVG src="./warning.svg" />
        <span className="warningText">{t("turnOnlocation")}!</span>
      </div>
    );
  return (
    <div className="distance">
      <ReactSVG src="icons/route.svg" />
      <div>
        <div className="distance-distance">
          {t("distance")}: {companyInfo?.distance?.distance || t("loading")}
        </div>
        <div className="distance-duration">
          <div className="distance-duration-box">
            <ReactSVG src="./walkPerson.svg" />
            <span>{companyInfo?.distance?.walking_duration}</span>
          </div>
          •
          <div className="distance-duration-box">
            <ReactSVG src="./car.fill.svg" />
            <span>{companyInfo?.distance?.duration}</span>
          </div>
        </div>
      </div>

      <a
        className="mapImg"
        href={`https://maps.google.com/?q=${companyInfo.latitude},${companyInfo.longitude}`}
        target="_blank"
        rel="noopener noreferrer">
        <img src="./map.jpg" alt="" />
      </a>
    </div>
  );
};

export default Distance;
