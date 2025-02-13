import { ReactSVG } from "react-svg";
import { SocialMedia } from "../../../app/types/companyType";
import { openLinkNavigate } from "../../../hooks/openLinkNavigate";
import "../dropDownMenuHolderStyle.scss";
const SocialMediaComponent = ({
  social_media,
}: {
  social_media: SocialMedia;
}) => {
  return (
    <div className="dropDownMenuHolderStyle">
      {Object.entries(social_media || {})
        .filter(([_, url]) => url)
        .map(([name, url]) => {
          const link =
            name.toLowerCase() === "telegram"
              ? `t.me/${url.replace("@", "")}`
              : name.toLowerCase() === "whatsapp"
              ? `https://wa.me/${url.replace("+", "").trim()}`
              : url;

          return (
            <div
              className="dropDownMenuHolderStyle__icons"
              onClick={() => openLinkNavigate(link)}
              key={name}>
              <div className="dropDownMenuHolderStyle__icons__logo">
                <ReactSVG src={`./social/${name}.svg`} />
              </div>
              <span>{name}</span>
            </div>
          );
        })}
    </div>
  );
};

export default SocialMediaComponent;
