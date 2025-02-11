import { useTranslation } from "react-i18next";
import { ReactSVG } from "react-svg";
import { CompanyState } from "../../app/types/companyType";
import "./distance.scss";

const Distance = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const { t } = useTranslation();

  // const getLocation = () => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         console.log("Latitude:", position.coords.latitude);
  //         console.log("Longitude:", position.coords.longitude);
  //       },
  //       (error) => {
  //         console.error("Ошибка получения геолокации:", error);
  //       },
  //     );
  //   } else {
  //     console.error("Геолокация не поддерживается");
  //   }
  // };

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
