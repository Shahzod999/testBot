import { useMemo } from "react";
import { ContactsActions } from "./ContactsActions";
import "./contacts.scss";
import { CompanyState } from "../../app/types/companyType";
import { ReactSVG } from "react-svg";

import { Link } from "react-router-dom";
import EmailContact from "./Email/EmailContact";
import SocialMediaComponent from "./SocialMedia/SocialMediaComponent";
import { useTranslation } from "react-i18next";
// import { useWorkTimeStatus } from "../../hooks/useWorkTimeStatus";

import CompanyApps from "./CompanyApps/CompanyApps";
import Vacancies from "./Vacancies/Vacancies";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
// import WorkingHoursList from "../WorkingHoursList/WorkingHoursList";
// import useSortedWorkingHours from "../../hooks/sortingDays";

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
  // const sortedWorkingHours = useSortedWorkingHours(companyInfo?.working_hours);
  // const { status, workingHours } = useWorkTimeStatus(
  //   companyInfo?.working_hours,
  // );
  const { t } = useTranslation();

  const actions = useMemo(
    () => [
      // {
      //   text: `${status} ${workingHours}`,
      //   icon: "Exclude.svg",
      //   isDisabled: false,
      //   menu: <WorkingHoursList working_hours={sortedWorkingHours} />,
      // },
      {
        text: companyInfo?.phone_number || t("noNumber"),
        icon: "phone.svg",
        isDisabled: !companyInfo?.phone_number,
        phone: companyInfo?.phone_number
          ? `tel:${companyInfo.phone_number}`
          : null,
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
      },
      {
        text: t("downloadApps"),
        secondText: t("mobileApps"),
        icon: "./Vector.svg",
        isDisabled:
          !companyInfo.mobile_apps?.android && !companyInfo.mobile_apps?.ios,
        menu: <CompanyApps companyInfo={companyInfo} />,
      },
      {
        text: companyInfo?.website?.replace("https://", "") || t("noWebsite"),
        isDisabled: !companyInfo.website,
        icon: "australia.svg",
        phone: companyInfo?.website ? companyInfo.website : null,
      },
      {
        text: t("availableVacancies"),
        icon: "person.svg",
        isDisabled: true,
        menu: <Vacancies />,
      },
      {
        text: companyInfo?.email || t("noEmail"),
        isDisabled: !companyInfo?.email,
        icon: "email.svg",
        menu: <EmailContact companyInfo={companyInfo} />,
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
          {actions.map(({ text, icon, isDisabled, phone, menu }, index) => (
            <DropDownMenu
              notAwalible={isDisabled || !!phone}
              key={index}
              toggle={
                <ContactsActions
                  text={text}
                  icon={icon}
                  isDisabled={isDisabled}
                  phone={phone}
                />
              }
              menu={menu}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Contacts;
