import { useTranslation } from "react-i18next";
import { ReactSVG } from "react-svg";
import { CompanyState } from "../../app/types/companyType";
import "./distance.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  selectedUserLocation,
  setuserLocation,
} from "../../app/features/userLocationSlice";
// import { errorToast, succesToast } from "../../app/features/toastSlice";

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
          console.error("Ошибка получения геолокации:", error);
        },
      );
    } else {
      console.error("Геолокация не поддерживается");
    }
  };

  // const handleLocation = () => {
  //   const tg = window.Telegram.WebApp;

  //   // Проверяем, поддерживается ли LocationManager
  //   if (!tg.LocationManager) {
  //     dispatch(errorToast(t("locationNotSupported")));
  //     return;
  //   }

  //   tg.LocationManager.init(() => {
  //     tg.LocationManager.requestAccess((result: any) => {
  //       if (result.status === "denied") {
  //         dispatch(errorToast(t("locationPermissionDenied")));
  //         return;
  //       }

  //       if (result.status === "granted") {
  //         tg.LocationManager.getLocation((location: any) => {
  //           if (location) {
  //             dispatch(
  //               setuserLocation({
  //                 lat: location.latitude,
  //                 lon: location.longitude,
  //               }),
  //             );
  //             dispatch(succesToast(t("successfullyUpdated")));
  //           } else {
  //             dispatch(errorToast(t("locationError")));
  //           }
  //         });
  //       } else {
  //         dispatch(errorToast(t("unknownLocationError")));
  //       }
  //     });
  //   });
  // };

  console.log(locationUser);

  if (!locationUser.lat)
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
          {/* {parseFloat(companyInfo?.distance?.distance) > 2 &&
          !companyInfo?.distance?.distance?.split(" ")?.includes("km") && (
            <> */}
          <div className="distance-duration-box">
            <ReactSVG src="./walkPerson.svg" />
            <span>{companyInfo?.distance?.walking_duration}</span>
          </div>
          •
          {/* </>
          )} */}
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
