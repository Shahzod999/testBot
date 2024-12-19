import { ReactSVG } from "react-svg";
import { CompanyState } from "../../app/types/companyType";
import "./adressLinks.scss";

const AdressLinks = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const handleCopyAdress = (copy: string) => {
    const textToCopy = copy; // Это может быть любая строка или значение
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("Текст скопирован в буфер обмена");
      })
      .catch((error) => {
        console.error("Не удалось скопировать текст: ", error);
      });
  };

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

      <div
        className="socialMedia__adress"
        onClick={() => handleCopyAdress(`${companyInfo.full_address}`)}>
        <ReactSVG src="./locationNavig.svg" />
        <p className="socialMedia__adress__text">{companyInfo.full_address}</p>
      </div>

      <div
        className="coordinates"
        onClick={() =>
          handleCopyAdress(`${companyInfo.latitude},${companyInfo.longitude}`)
        }>
        <span>Координаты:</span>
        <strong>{companyInfo.latitude},</strong>
        <strong>{companyInfo.longitude}</strong>
        <span>
          <ReactSVG src="./copy.svg" />
        </span>
      </div>
    </div>
  );
};

export default AdressLinks;
