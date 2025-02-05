import { useTranslation } from "react-i18next";
import { CompanyState } from "../../../app/types/companyType";
import { ReactSVG } from "react-svg";

const CompanyApps = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const { t } = useTranslation();
  return (
    <div className="dropDownMenuHolderStyle">
      <div className="dropDownMenuHolderStyle__icons">
        <div className="dropDownMenuHolderStyle__icons__logo">
          <a
            href={companyInfo?.mobile_apps?.android}
            target="_blank"
            rel="noopener noreferrer">
            <ReactSVG src={`./social/appStore.svg`} />
          </a>
        </div>

        <span>{t("link")} App Store</span>
      </div>
      <div className="dropDownMenuHolderStyle__icons">
        <div className="dropDownMenuHolderStyle__icons__logo">
          <a
            href={companyInfo?.mobile_apps?.ios}
            target="_blank"
            rel="noopener noreferrer">
            <ReactSVG src={`./social/googlePlay.svg`} />
          </a>
        </div>

        <span>{t("link")} Google Play</span>
      </div>
    </div>
  );
};

export default CompanyApps;
