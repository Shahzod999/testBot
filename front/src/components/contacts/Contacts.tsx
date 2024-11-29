import { useState } from "react";
import { ContactsActions } from "./ContactsActions";
import "./contacts.scss";
import { CompanyState } from "../../app/types/companyType";
import UserApps from "./Actions/UserApps";
import BottomSheet from "./Actions/BottomSheet";

const getAvailableSocialMedia = (socialMedia: Record<string, string | any | null>): string => {
  const names = Object.entries(socialMedia)
    .filter(([_, url]) => url)
    .map(([name]) => name);
  return names.length > 0 ? names.join(", ") : "Соцсети не указаны";
};

const Contacts = ({ companyInfo }: { companyInfo: CompanyState }) => {
  if (!companyInfo) return null;

  const actions = [
    {
      text: "Мобильные приложения",
      icon: "./Vector.svg",
      isDisabled: !companyInfo.mobile_apps?.android && !companyInfo.mobile_apps?.ios,
      key: "apps",
    },
    {
      text: getAvailableSocialMedia(companyInfo.social_media || {}) || "Нет Сетей",
      icon: "smileCircle.svg",
      isDisabled: !Object.values(companyInfo.social_media || {}).some((url) => url),
      key: "socialMedia",
    },
    {
      text: companyInfo?.phone_number || "Нет Номера",
      icon: "phone.svg",
      isDisabled: !companyInfo?.phone_number,
      key: "phone",
    },
    {
      text: companyInfo.website.replace("https://", "") || "Нет Сайта",
      isDisabled: !companyInfo.website,
      icon: "australia.svg",
      key: "map",
    },
    {
      text: "Открыто до 22:00",
      icon: "Exclude.svg",
      isDisabled: false,
      key: "workingHours",
    },
    {
      text: companyInfo.address || "Нет Адресса",
      isDisabled: !companyInfo.address,
      icon: "location.svg",
      key: "location",
    },
    {
      text: "Доступные вакансии (2)",
      icon: "person.svg",
      isDisabled: false,
      key: "person",
    },
  ];

  const [openActions, setOpenActions] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const toggleActions = () => {
    setOpenActions(!openActions);
  };

  const handleActionClick = (key: string) => {
    setActiveAction(key);
  };
  const closeBottomSheet = () => {
    setActiveAction(null);
  };

  return (
    <>
      <div className="contacts">
        <div className="contacts__header">
          <h2>Контакты</h2>
          <button>
            <object type="image/svg+xml" data="./edit.svg">
              Your browser does not support SVG
            </object>
            Редактировать
          </button>
        </div>
        <div className="contacts__actions">
          {actions.map(({ text, icon, isDisabled, key }) => (
            <div onClick={() => !isDisabled && handleActionClick(key)} key={key}>
              <ContactsActions text={text} icon={icon} isDisabled={isDisabled} />
            </div>
          ))}
        </div>
      </div>

      <BottomSheet isOpen={!!activeAction} onClose={closeBottomSheet}>
        {activeAction === "apps" && (
          <div>
            <h3>Скачать приложения</h3>
            <a href={companyInfo.mobile_apps?.android} target="_blank" rel="noopener noreferrer">
              Google Play
            </a>
            <a href={companyInfo.mobile_apps?.ios} target="_blank" rel="noopener noreferrer">
              App Store
            </a>
          </div>
        )}
        {activeAction === "socialMedia" && (
          <div>
            <h3>Социальные сети</h3>
            {Object.entries(companyInfo.social_media || {})
              .filter(([_, url]) => url)
              .map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer">
                  {name}
                </a>
              ))}
          </div>
        )}
        {activeAction === "workingHours" && (
          <div>
            <h3>График работы</h3>
            <p>Понедельник - Пятница: 10:00 - 22:00</p>
            <p>Суббота - Воскресенье: 12:00 - 20:00</p>
          </div>
        )}
        {activeAction === "location" && (
          <div>
            <h3>Адрес</h3>
            <p>{companyInfo.address}</p>
            <a href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address || "")}`} target="_blank" rel="noopener noreferrer">
              Открыть в Google Maps
            </a>
            <a href={`https://yandex.ru/maps/?text=${encodeURIComponent(companyInfo.address || "")}`} target="_blank" rel="noopener noreferrer">
              Открыть в Яндекс.Картах
            </a>
          </div>
        )}
      </BottomSheet>
    </>
  );
};

export default Contacts;
