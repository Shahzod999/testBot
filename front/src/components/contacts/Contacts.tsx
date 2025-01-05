import { useState, useMemo, useCallback, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import useDayTranslator from "../../hooks/translateDay";
import useSortedWorkingHours from "../../hooks/sortingDays";
import { useAppDispatch } from "../../hooks/reduxHooks";

const getAvailableSocialMedia = (
  socialMedia: Record<string, string | any | null>,
): string => {
  const names = Object.entries(socialMedia)
    .filter(([_, url]) => url)
    .map(([name]) => name);
  return names.length > 0 ? names.join(", ") : "Соцсети не указаны";
};

const Contacts = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const translateDay = useDayTranslator();
  const sortedWorkingHours = useSortedWorkingHours(companyInfo.working_hours);

  const [activeAction, setActiveAction] = useState<string | null>(null);

  const actions = useMemo(
    () => [
      {
        text: "Скачать приложения",
        secondText: "Мобильное приложение заведении",
        icon: "./Vector.svg",
        isDisabled:
          !companyInfo.mobile_apps?.android && !companyInfo.mobile_apps?.ios,
        key: "apps",
      },
      {
        text:
          getAvailableSocialMedia(companyInfo.social_media || {}) ||
          "Нет Сетей",
        secondText: "Переход на страницы",
        icon: "smileCircle.svg",
        isDisabled: !Object.values(companyInfo.social_media || {}).some(
          (url) => url,
        ),
        key: "socialMedia",
      },
      {
        text: companyInfo?.phone_number || "Нет Номера",
        icon: "phone.svg",
        isDisabled: !companyInfo?.phone_number,
        // key: "phone",
        phone: companyInfo?.phone_number
          ? `tel:${companyInfo.phone_number}`
          : null,
      },
      {
        text: companyInfo?.website?.replace("https://", "") || "Нет Сайта",
        isDisabled: !companyInfo.website,
        icon: "australia.svg",
        // key: "map",
        phone: companyInfo?.website ? companyInfo.website : null,
      },
      {
        text: companyInfo?.email || "Почта не доступна",
        isDisabled: !companyInfo?.email,
        icon: "email.svg",
        // key: "map",
        phone: companyInfo?.email ? `mailto:${companyInfo.email}` : null,
      },
      {
        timeComponent: <WorkTime working_hours={companyInfo.working_hours} />,
        icon: "Exclude.svg",
        isDisabled: false,
        key: "workingHours",
      },
      {
        text: companyInfo?.address || "Нет Адресса",
        isDisabled: !companyInfo?.address,
        icon: "location.svg",
        key: "location",
      },
      {
        text: "Доступные вакансии",
        icon: "person.svg",
        isDisabled: false,
        key: "person",
      },
    ],
    [companyInfo],
  );

  const tg = window.Telegram.WebApp;

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

  const navigateToEdit = () => {
    navigate("edit");
  };

  useEffect(() => {
    if (activeAction) {
      tg.BackButton.show();
      tg.BackButton.onClick(() => {
        closeBottomSheet();
        tg.BackButton.offClick(closeBottomSheet);
      });
    } else {
      tg.BackButton.hide();
    }
  }, [activeAction, dispatch, closeBottomSheet]);

  if (!companyInfo) return null;
  return (
    <>
      <div className="contacts">
        <div className="contacts__header">
          <h2>Контакты</h2>
          <span
            onClick={navigateToEdit}
            className="pressEffefct contacts__header__button">
            <ReactSVG src="./edit.svg" />
            Редактировать
          </span>
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
          <h3>Мобильное приложение заведении</h3>
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
        <div className="socialMedia">
          <h3>Переход на страницы</h3>
          <div className="socialMedia__icons">
            {Object.entries(companyInfo.social_media || {})
              .filter(([_, url]) => url)
              .map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer">
                  <div className="socialMedia__icons__logo">
                    <ReactSVG src={`./social/${name}.svg`} />
                  </div>
                  <span>{name}</span>
                </a>
              ))}
          </div>
        </div>
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
            Заведение закрыто
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
          <h3 className="contacts__actions__title">Укажите причину</h3>
          <p className="contacts__actions__warning">
            За недостоверное показание у вас отнимается один коин!
          </p>

          <label className="actions pressEffefct" htmlFor="cause">
            <span className="actions__text closedButtontext">Причина</span>
            <span className="actions__icons closedButtonInput">
              <input type="checkbox" name="" id="cause" />
            </span>
          </label>
          <label className="actions pressEffefct" id="closedForevew">
            <span className="actions__text closedButtontext">
              Закрыто навсегда
            </span>
            <span className="actions__icons closedButtonInput">
              <input type="checkbox" name="" id="closedForevew" />
            </span>
          </label>
          <label className="actions pressEffefct" htmlFor="worktime">
            <span className="actions__text closedButtontext">
              Не соответсвует с графиком работы
            </span>
            <span className="actions__icons closedButtonInput">
              <input type="checkbox" name="" id="worktime" />
            </span>
          </label>
          <CommonButton createdFunction={closeBottomSheet}>
            <span>Отправить</span>
          </CommonButton>
        </div>
      </BottomSheet>
      <BottomSheet
        isOpen={activeAction === "person"}
        onClose={closeBottomSheet}>
        <div className="socialMedia">
          <h3>Вакансии</h3>
          <Lottie animationData={notFound} />
        </div>
      </BottomSheet>
    </>
  );
};

export default Contacts;
