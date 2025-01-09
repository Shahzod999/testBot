import { useState, useMemo, useCallback } from "react";
import { ContactsActions } from "./ContactsActions";
import "./contacts.scss";
import { CompanyState } from "../../app/types/companyType";
import BottomSheet from "../Actions/BottomSheet";
import CommonButton from "../Actions/CommonButton";
import { ReactSVG } from "react-svg";
import Lottie from "lottie-react";
import notFound from "../../../public/notFound.json";
import AdressLinks from "../adressLinks/AdressLinks";
import WorkTime from "../mainInfo/WorkTime";
import convertTo24HourFormat from "../../hooks/convertTo24HourFormat";
import { Link } from "react-router-dom";
import useDayTranslator from "../../hooks/translateDay";
import useSortedWorkingHours from "../../hooks/sortingDays";
import EmailContact from "./Email/EmailContact";
import SocialMediaComponent from "./SocialMedia/SocialMediaComponent";
import { useTranslation } from "react-i18next";

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
  const translateDay = useDayTranslator();
  const sortedWorkingHours = useSortedWorkingHours(companyInfo.working_hours);
  const { t } = useTranslation();

  const [activeAction, setActiveAction] = useState<string | null>(null);

  const actions = useMemo(
    () => [
      {
        text: t("downloadApps"),
        secondText: t("mobileApps"),
        icon: "./Vector.svg",
        isDisabled:
          !companyInfo.mobile_apps?.android && !companyInfo.mobile_apps?.ios,
        key: "apps",
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
        key: "socialMedia",
      },
      {
        text: companyInfo?.phone_number || t("noNumber"),
        icon: "phone.svg",
        isDisabled: !companyInfo?.phone_number,
        phone: companyInfo?.phone_number
          ? `tel:${companyInfo.phone_number}`
          : null,
      },
      {
        text: companyInfo?.website?.replace("https://", "") || t("noWebsite"),
        isDisabled: !companyInfo.website,
        icon: "australia.svg",
        phone: companyInfo?.website ? companyInfo.website : null,
      },
      {
        text: companyInfo?.email || t("noEmail"),
        isDisabled: !companyInfo?.email,
        icon: "email.svg",
        key: companyInfo?.email ? "email" : null,
        // phone: companyInfo?.email ? `mailto:${companyInfo.email}` : null,
      },
      {
        timeComponent: <WorkTime working_hours={companyInfo.working_hours} />,
        icon: "Exclude.svg",
        isDisabled: false,
        key: "workingHours",
      },
      {
        text: companyInfo?.address || t("noAddress"),
        isDisabled: !companyInfo?.address,
        icon: "location.svg",
        key: "location",
      },
      {
        text: t("availableVacancies"),
        icon: "person.svg",
        isDisabled: false,
        key: "person",
      },
    ],
    [companyInfo],
  );

  const handleActionClick = useCallback((key: string | null) => {
    if (key) {
      document.body.style.overflow = "hidden";
    }
    setActiveAction(key);
  }, []);

  const closeBottomSheet = useCallback(() => {
    document.body.style.overflow = "";
    setActiveAction(null);
  }, []);

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
        <div className="contacts__actions">
          {actions.map(
            ({ text, icon, isDisabled, key, phone, timeComponent }, index) => (
              <div
                onClick={() => !isDisabled && handleActionClick(key || null)}
                key={index}>
                <ContactsActions
                  text={text}
                  icon={icon}
                  isDisabled={isDisabled}
                  arrowRight={true}
                  phone={phone}
                  timeComponent={timeComponent}
                />
              </div>
            ),
          )}
        </div>
      </div>
      <BottomSheet isOpen={activeAction === "apps"} onClose={closeBottomSheet}>
        <div className="socialMedia">
          <h3>{t("mobileApps")}</h3>
          <div className="socialMedia__icons">
            <a
              href={companyInfo.mobile_apps?.android}
              target="_blank"
              rel="noopener noreferrer">
              <img src="./GooglePlay.png" alt="" />
            </a>
            <a
              href={companyInfo.mobile_apps?.ios}
              target="_blank"
              rel="noopener noreferrer">
              <img src="./AppStore.png" alt="" />
            </a>
          </div>
        </div>
      </BottomSheet>
      <BottomSheet
        isOpen={activeAction === "socialMedia"}
        onClose={closeBottomSheet}>
        <SocialMediaComponent social_media={companyInfo?.social_media} />
      </BottomSheet>
      <BottomSheet
        isOpen={activeAction === "workingHours"}
        onClose={closeBottomSheet}>
        <div className="contacts__actions">
          {Object.entries(sortedWorkingHours).map(([day, hours]) => (
            <div key={day}>
              <ContactsActions
                text={convertTo24HourFormat(hours)}
                mainText={translateDay(day)}
                style={"editWorkHour"}
                isDisabled={hours == "Closed"}
              />
            </div>
          ))}

          <button
            className="contacts__actions__closedCompanyButton"
            onClick={() => handleActionClick("closed")}>
            {t("closed")}
          </button>
        </div>
      </BottomSheet>
      <BottomSheet
        isOpen={activeAction === "location"}
        onClose={closeBottomSheet}>
        <AdressLinks companyInfo={companyInfo} />
      </BottomSheet>
      <BottomSheet
        isOpen={activeAction === "closed"}
        onClose={closeBottomSheet}>
        <div className="contacts__actions">
          <h3 className="contacts__actions__title">{t("reasonTitle")}</h3>
          <p className="contacts__actions__warning">{t("warning")}</p>

          <label className="actions pressEffefct" htmlFor="cause">
            <span className="actions__text closedButtontext">
              {t("reason")}
            </span>
            <span className="actions__icons closedButtonInput">
              <input type="checkbox" name="" id="cause" />
            </span>
          </label>
          <label className="actions pressEffefct" id="closedForevew">
            <span className="actions__text closedButtontext">
              {t("closedForever")}
            </span>
            <span className="actions__icons closedButtonInput">
              <input type="checkbox" name="" id="closedForevew" />
            </span>
          </label>
          <label className="actions pressEffefct" htmlFor="worktime">
            <span className="actions__text closedButtontext">
              {t("notMatchWorktime")}
            </span>
            <span className="actions__icons closedButtonInput">
              <input type="checkbox" name="" id="worktime" />
            </span>
          </label>
          <CommonButton createdFunction={closeBottomSheet}>
            <span>{t("send")}</span>
          </CommonButton>
        </div>
      </BottomSheet>
      <BottomSheet
        isOpen={activeAction === "person"}
        onClose={closeBottomSheet}>
        <div className="socialMedia">
          <h3>{t("vacancies")}</h3>
          <Lottie animationData={notFound} />
        </div>
      </BottomSheet>
      <BottomSheet isOpen={activeAction === "email"} onClose={closeBottomSheet}>
        <EmailContact companyInfo={companyInfo} />
      </BottomSheet>
    </>
  );
};

export default Contacts;
