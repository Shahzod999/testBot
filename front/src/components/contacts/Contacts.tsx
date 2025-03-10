import { useMemo } from "react";
import { ContactsActions } from "./ContactsActions";
import "./contacts.scss";
import { CompanyState } from "../../app/types/companyType";
import { ReactSVG } from "react-svg";

import { Link } from "react-router-dom";
import EmailContact from "./Email/EmailContact";
import SocialMediaComponent from "./SocialMedia/SocialMediaComponent";
import { useTranslation } from "react-i18next";
import CompanyApps from "./CompanyApps/CompanyApps";
import Vacancies from "./Vacancies/Vacancies";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import useAnalyticsTracker from "../../hooks/useAnalyticsTracker";
import { AnalyticsState } from "../../app/features/analyticsSlice";

const getAvailableSocialMedia = (
  socialMedia: Record<string, string | any | null>,
  t: Function,
): string => {
  const names = Object.entries(socialMedia)
    .filter(([_, url]) => url)
    .map(([name]) => name);
  return names.length > 0 ? names.join(", ") : t("noSocialMedia");
};

const Contacts = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const { track } = useAnalyticsTracker(companyInfo._id);
  const { t } = useTranslation();

  const actions = useMemo(
    () => [
      {
        text: companyInfo?.phone_number || t("noNumber"),
        icon: "phone.svg",
        isDisabled: !companyInfo?.phone_number,
        phone: companyInfo?.phone_number
          ? `tel:${companyInfo.phone_number}`
          : null,
        analytics: "call",
      },
      {
        text:
          getAvailableSocialMedia(companyInfo.social_media || {}, t) ||
          t("noNetworks"),
        secondText: t("goToPages"),
        icon: "smileCircle.svg",
        isDisabled: !Object.values(companyInfo.social_media || {}).some(
          (url) => url,
        ),
        menu: <SocialMediaComponent social_media={companyInfo?.social_media} />,
        analytics: "social_media",
      },
      {
        text: t("downloadApps"),
        secondText: t("mobileApps"),
        icon: "./Vector.svg",
        isDisabled:
          !companyInfo.mobile_apps?.android && !companyInfo.mobile_apps?.ios,
        menu: <CompanyApps companyInfo={companyInfo} />,
        analytics: "applications",
      },
      {
        text: companyInfo?.website?.replace("https://", "") || t("noWebsite"),
        isDisabled: !companyInfo.website,
        icon: "australia.svg",
        website: companyInfo?.website ? companyInfo.website : null,
        analytics: "website",
      },
      {
        text: t("availableVacancies"),
        icon: "person.svg",
        isDisabled: true,
        menu: <Vacancies />,
        analytics: "vacancies",
      },
      {
        text: companyInfo?.email || t("noEmail"),
        isDisabled: !companyInfo?.email,
        icon: "email.svg",
        menu: <EmailContact companyInfo={companyInfo} />,
        analytics: "email",
      },
    ],
    [companyInfo],
  );

  if (!companyInfo) return null;
  return (
    <>
      <div className="contacts">
        <div className="contacts__header">
          <h2>{t("contactsTitle")}</h2>
          <Link to="/edit" className="pressEffefct contacts__header__button">
            <ReactSVG src="./edit.svg" />
            {t("edit")}
          </Link>
        </div>

        <div className="contacts__actions contacts__totalmenu">
          {actions.map(
            (
              { text, icon, isDisabled, phone, menu, analytics, website },
              index,
            ) => (
              <DropDownMenu
                onClick={() => track(analytics as keyof AnalyticsState)}
                notAwalible={isDisabled || !!phone || !!website}
                key={index}
                toggle={
                  <ContactsActions
                    text={text}
                    icon={icon}
                    isDisabled={isDisabled}
                    phone={phone}
                    website={website}
                  />
                }
                menu={menu}
              />
            ),
          )}
        </div>
      </div>
    </>
  );
};

export default Contacts;
