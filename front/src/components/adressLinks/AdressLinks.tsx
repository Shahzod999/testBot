import { ReactSVG } from "react-svg";
import { CompanyState } from "../../app/types/companyType";
import "./adressLinks.scss";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { errorToast } from "../../app/features/toastSlice";
import { useState } from "react";

const AdressLinks = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const [copyed, setCopyed] = useState<string | null>(null);
  const [copyAdress, setCopyAdress] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleCopyAdress = (copy: string, type: string) => {
    const textToCopy = copy;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("Текст скопирован в буфер обмена");
        handleHaptic();
        handleCopy("Текст скопирован", type);
      })
      .catch((error) => {
        dispatch(errorToast("Error"));
        console.error("Не удалось скопировать текст: ", error);
        handleHaptic();
        handleCopy("Не удалось скопировать", type);
      });
  };

  const handleCopy = (text: string, type: string) => {
    if (type == "adress") {
      setCopyAdress(text);
    } else {
      setCopyed(text);
    }

    const timer = setTimeout(() => {
      setCopyed(null);
      setCopyAdress(null);
    }, 3000);

    return timer;
  };

  const handleHaptic = () => {
    window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
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
        <span>Координаты:</span>

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
