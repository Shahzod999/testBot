import { useTranslation } from "react-i18next";
import { CompanyState } from "../../../app/types/companyType";
import { ReactSVG } from "react-svg";

const CompanyApps = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const { t } = useTranslation();

  const handleOpen = (app: string) => {
    window.Telegram.WebApp.openLink(app);
  };

  return (
    <div className="dropDownMenuHolderStyle">
      <div
        className="dropDownMenuHolderStyle__icons"
        onClick={() => handleOpen(companyInfo?.mobile_apps?.ios)}>
        <div className="dropDownMenuHolderStyle__icons__logo">
          <div>
            <ReactSVG src={`./social/appStore.svg`} />
          </div>
        </div>

        <span>{t("link")} App Store</span>
      </div>

      <div
        className="dropDownMenuHolderStyle__icons"
        onClick={() => handleOpen(companyInfo?.mobile_apps?.android)}>
        <div className="dropDownMenuHolderStyle__icons__logo">
          <div>
            <ReactSVG src={`./social/googlePlay.svg`} />
          </div>
        </div>

        <span>{t("link")} Google Play</span>
      </div>
    </div>
  );
};

export default CompanyApps;
