import { ReactSVG } from "react-svg";
import { CompanyState } from "../../app/types/companyType";
import "./adressLinks.scss";

const AdressLinks = ({ companyInfo }: { companyInfo: CompanyState }) => {
  return (
    <div className="socialMedia">
      <h3>Навигаторы и карты</h3>
      <div className="socialMedia__icons">
        <a
          href={`https://yandex.ru/maps/?text=${encodeURIComponent(
            companyInfo.address || "",
          )}`}
          target="_blank"
          rel="noopener noreferrer">
          <img src="./yandex.png" alt="" />
          <span>Яндекс карты</span>
        </a>
        <a
          href={`https://yandex.ru/maps/?text=${encodeURIComponent(
            companyInfo.address || "",
          )}`}
          target="_blank"
          rel="noopener noreferrer">
          <img src="./2gis.png" alt="" />
          <span>2ГИС</span>
        </a>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(
            companyInfo.address || "",
          )}`}
          target="_blank"
          rel="noopener noreferrer">
          <img src="./googleMaps.png" alt="" />
          <span>Google карты</span>
        </a>
        <a
          href={`https://www.waze.com/ru/live-map/?q=${encodeURIComponent(
            companyInfo.address || "",
          )}`}
          target="_blank"
          rel="noopener noreferrer">
          <img src="./waze.png" alt="" />
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
