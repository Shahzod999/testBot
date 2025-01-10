import { ReactSVG } from "react-svg";
import { CompanyState } from "../../app/types/companyType";
import "./adressLinks.scss";
import { useCopyAddress } from "../../hooks/copyText";
import { useTranslation } from "react-i18next";

const AdressLinks = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const { t } = useTranslation();
  const { copyed, copyAdress, handleCopyAdress } = useCopyAddress();

  return (
    <div className="socialMedia">
      <h3>{t("titleNavig")}</h3>
      <div className="socialMedia__icons">
        <a
          href={`https://yandex.ru/maps/?whatshere[point]=${companyInfo.longitude},${companyInfo.latitude}&z=16`}
          target="_blank"
          rel="noopener noreferrer">
          <ReactSVG src="./yandex.svg" />
          <span>{t("yandexMaps")}</span>
        </a>
        <a
          href={`https://2gis.uz/search/${encodeURIComponent(
            companyInfo.address || "",
          )}`}
          target="_blank"
          rel="noopener noreferrer">
          <ReactSVG src="./2gis.svg" />
          <span>{t("gis2")}</span>
        </a>
        <a
          href={`https://maps.google.com/?q=${companyInfo.latitude},${companyInfo.longitude}`}
          target="_blank"
          rel="noopener noreferrer">
          <ReactSVG src="./googleMaps.svg" />
          <span>{t("googleMaps")}</span>
        </a>
        <a
          href={`https://www.waze.com/ru/live-map/?ll=${companyInfo.latitude},${companyInfo.longitude}&navigate=yes`}
          target="_blank"
          rel="noopener noreferrer">
          <ReactSVG src="./waze.svg" />
          <span>{t("waze")}</span>
        </a>
      </div>

      <div
        className="socialMedia__adress"
        onClick={() =>
          handleCopyAdress(`${companyInfo.full_address}`, "adress")
        }>
        <ReactSVG src="./locationNavig.svg" />

        <p className="socialMedia__adress__text">
          {copyAdress || companyInfo.full_address}
        </p>
      </div>

      <div
        className="coordinates"
        onClick={() =>
          handleCopyAdress(
            `${companyInfo.latitude},${companyInfo.longitude}`,
            "latlon",
          )
        }>
        <span>{t("coordinates")}</span>

        {copyed ? (
          <strong>{copyed}</strong>
        ) : (
          <>
            <strong>{companyInfo.latitude.toFixed(4)},</strong>
            <strong>{companyInfo.longitude.toFixed(4)}</strong>
          </>
        )}
        <span>
          <ReactSVG src="./copy.svg" />
        </span>
      </div>
    </div>
  );
};

export default AdressLinks;
