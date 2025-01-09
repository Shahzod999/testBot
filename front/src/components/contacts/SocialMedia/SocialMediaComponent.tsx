import { ReactSVG } from "react-svg";
import { SocialMedia } from "../../../app/types/companyType";
import { openLinkNavigate } from "../../../hooks/openLinkNavigate";
import { useTranslation } from "react-i18next";

const SocialMediaComponent = ({
  social_media,
}: {
  social_media: SocialMedia;
}) => {
  const { t } = useTranslation();
  return (
    <div className="socialMedia">
      <h3>{t("goToPages")}</h3>
      <div className="socialMedia__icons">
        {Object.entries(social_media || {})
          .filter(([_, url]) => url)
          .map(([name, url]) => {
            const link =
              name.toLowerCase() === "telegram"
                ? `https://t.me/${url.replace("@", "")}`
                : name.toLowerCase() === "whatsapp"
                ? `https://wa.me/${url.replace("+", "").trim()}`
                : url;

            return (
              <span onClick={() => openLinkNavigate(link)} key={name}>
                <div className="socialMedia__icons__logo">
                  <ReactSVG src={`./social/${name}.svg`} />
                </div>
                <span>{name}</span>
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default SocialMediaComponent;
