import { ReactSVG } from "react-svg";
import { SocialMedia } from "../../../app/types/companyType";
import { openLinkNavigate } from "../../../hooks/openLinkNavigate";
import "../dropDownMenuHolderStyle.scss";
const SocialMediaComponent = ({
  social_media,
}: {
  social_media: SocialMedia;
}) => {
  console.log(social_media);

  const handleClick = (name: string, url: string) => {
    const link =
      name.toLowerCase() === "telegram"
        ? `https://t.me/${url.replace(/(@|https:\/\/|t\.me\/)/g, "")}`
        : name.toLowerCase() === "whatsapp"
        ? `https://wa.me/${url.replace("+", "").trim()}`
        : url;

    if (name.toLowerCase() === "telegram") {
      window.Telegram.WebApp.openTelegramLink(link);
      // Открывает в Telegram
    } else {
      openLinkNavigate(link); // Открывает в браузере
    }
  };

  return (
    <div className="dropDownMenuHolderStyle">
      {Object.entries(social_media || {})
        .filter(([_, url]) => url)
        .map(([name, url]) => (
          <div
            className="dropDownMenuHolderStyle__icons"
            onClick={() => handleClick(name, url)}
            key={name}>
            <div className="dropDownMenuHolderStyle__icons__logo">
              <ReactSVG src={`./social/${name}.svg`} />
            </div>
            <span>{name}</span>
          </div>
        ))}
    </div>
  );
};

export default SocialMediaComponent;
