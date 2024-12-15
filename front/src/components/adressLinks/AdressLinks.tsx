import { ReactSVG } from "react-svg";
import { CompanyState } from "../../app/types/companyType";
import "./adressLinks.scss";

const AdressLinks = ({ companyInfo }: { companyInfo: CompanyState }) => {
  console.log(companyInfo.longitude);

  return (
    <div className="socialMedia">
      <h3>Навигаторы и карты</h3>
      <div className="socialMedia__icons">
        <a
          href={`https://yandex.ru/maps/?whatshere[point]=${companyInfo.longitude},${companyInfo.latitude}&z=16`}
          target="_blank"
          rel="noopener noreferrer">
          <ReactSVG src="./yandex.svg" />
          <span>Яндекс карты</span>
        </a>
        <a
          href={`https://2gis.uz/search/${encodeURIComponent(
            companyInfo.address || "",
          )}`}
          target="_blank"
          rel="noopener noreferrer">
          <ReactSVG src="./2gis.svg" />
          <span>2ГИС</span>
        </a>
        <a
          href={`https://maps.google.com/?q=${companyInfo.latitude},${companyInfo.longitude}`}
          target="_blank"
          rel="noopener noreferrer">
          <ReactSVG src="./googleMaps.svg" />
          <span>Google карты</span>
        </a>
        <a
          href={`https://www.waze.com/ru/live-map/?ll=${companyInfo.latitude},${companyInfo.longitude}&navigate=yes`}
          target="_blank"
          rel="noopener noreferrer">
          <ReactSVG src="./waze.svg" />
          <span>Waze</span>
        </a>
      </div>

      <div className="socialMedia__adress">
        <ReactSVG src="./locationNavig.svg" />
        <p className="socialMedia__adress__text">{companyInfo.full_address}</p>
      </div>
    </div>
  );
};

export default AdressLinks;
