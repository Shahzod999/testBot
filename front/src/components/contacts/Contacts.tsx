import { useState } from "react";
import { ContactsActions } from "./ContactsActions";
import "./contacts.scss";
import { CompanyState } from "../../app/types/companyType";
import BottomSheet from "../Actions/BottomSheet";
import CommonButton from "../Actions/CommonButton";
import Cross from "../raiting/AddComment/Cross";
import EditAction from "./EditAction";

const getAvailableSocialMedia = (socialMedia: Record<string, string | any | null>): string => {
  const names = Object.entries(socialMedia)
    .filter(([_, url]) => url)
    .map(([name]) => name);
  return names.length > 0 ? names.join(", ") : "Соцсети не указаны";
};

const Contacts = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  if (!companyInfo) return null;

  const actions = [
    {
      text: "Скачать приложения",
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
      text: companyInfo?.website?.replace("https://", "") || "Нет Сайта",
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

  const handleActionClick = (key: string) => {
    setActiveAction(key);
  };
  const closeBottomSheet = () => {
    setActiveAction(null);
  };

  console.log(companyInfo);

  return (
    <>
      <div className="contacts">
        <div className="contacts__header">
          <h2>Контакты</h2>
          <button className="pressEffefct" onClick={() => handleActionClick("edit")}>
            <img src="./edit.svg" alt="edit" />
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
      <BottomSheet isOpen={activeAction === "apps"} onClose={closeBottomSheet}>
        <div className="socialMedia">
          <h3>Мобильное приложение заведении</h3>
          <div className="socialMedia__icons">
            <a href={companyInfo.mobile_apps?.android} target="_blank" rel="noopener noreferrer">
              <img src="./GooglePlay.png" alt="" />
            </a>
            <a href={companyInfo.mobile_apps?.ios} target="_blank" rel="noopener noreferrer">
              <img src="./AppStore.png" alt="" />
            </a>
          </div>
        </div>
      </BottomSheet>
      <BottomSheet isOpen={activeAction === "socialMedia"} onClose={closeBottomSheet}>
        <div className="socialMedia">
          <h3>Переход на страницы</h3>
          <div className="socialMedia__icons">
            {Object.entries(companyInfo.social_media || {})
              .filter(([_, url]) => url)
              .map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer">
                  <div className="socialMedia__icons__logo">
                    <img src={`./${name}.png`} alt="" />
                  </div>
                  <span>{name}</span>
                </a>
              ))}
          </div>
        </div>
      </BottomSheet>
      <BottomSheet isOpen={activeAction === "workingHours"} onClose={closeBottomSheet}>
        <div className="contacts__actions">
          {Object.entries(companyInfo.working_hours).map(([day, hours]) => (
            <div key={day}>
              <ContactsActions text={hours} mainText={day} style={"workHour"} isDisabled={hours == "Выходной"} />
            </div>
          ))}

          <button className="contacts__actions__closedCompanyButton" onClick={() => handleActionClick("closed")}>
            Заведение закрыто
          </button>
        </div>
      </BottomSheet>
      <BottomSheet isOpen={activeAction === "location"} onClose={closeBottomSheet}>
        <div className="socialMedia">
          <div className="socialMedia__icons">
            <a href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address || "")}`} target="_blank" rel="noopener noreferrer">
              <img src="./yandex.png" alt="" />
              <span>Яндекс карты</span>
            </a>
            <a href={`https://yandex.ru/maps/?text=${encodeURIComponent(companyInfo.address || "")}`} target="_blank" rel="noopener noreferrer">
              <img src="./2gis.png" alt="" />
              <span>2ГИС</span>
            </a>
            <a href={`https://yandex.ru/maps/?text=${encodeURIComponent(companyInfo.address || "")}`} target="_blank" rel="noopener noreferrer">
              <img src="./googleMaps.png" alt="" />
              <span>Google карты</span>
            </a>
          </div>
        </div>
      </BottomSheet>
      <BottomSheet isOpen={activeAction === "closed"} onClose={closeBottomSheet}>
        <div className="contacts__actions">
          <h3 className="contacts__actions__title">Укажите причину</h3>
          <p className="contacts__actions__warning">За недостоверное показание у вас отнимается один коин!</p>

          <label className="actions pressEffefct" htmlFor="cause">
            <span className="actions__text closedButtontext">Причина</span>
            <span className="actions__icons closedButtonInput">
              <input type="checkbox" name="" id="cause" />
            </span>
          </label>
          <label className="actions pressEffefct" id="closedForevew">
            <span className="actions__text closedButtontext">Закрыто навсегда</span>
            <span className="actions__icons closedButtonInput">
              <input type="checkbox" name="" id="closedForevew" />
            </span>
          </label>
          <label className="actions pressEffefct" htmlFor="worktime">
            <span className="actions__text closedButtontext">Не соответсвует с графиком работы</span>
            <span className="actions__icons closedButtonInput">
              <input type="checkbox" name="" id="worktime" />
            </span>
          </label>
          <CommonButton createdFunction={closeBottomSheet}>
            <span>Отправить</span>
            <span className="contacts__actions__coin">
              +1
              <img src="./coin.svg" alt="" />
            </span>
          </CommonButton>
        </div>
      </BottomSheet>
      <BottomSheet isOpen={activeAction === "edit"} onClose={closeBottomSheet}>
        <div className="contacts__actions">
          <div className="contacts__actions__closeButtons">
            <span className="contacts__actions__closeButtons__title">Редактировать {companyInfo.name}</span>
            <div className="contacts__actions__closeButtons__cross">
              <Cross toggleComment={closeBottomSheet} />
            </div>
          </div>
          <h3 className="contacts__actions__title">Общая информация</h3>

          <EditAction smallInfo="Название" text={companyInfo?.name} icon="./phone.svg" isDisabled={!companyInfo?.name} />
          <EditAction smallInfo="Адрес" text={companyInfo?.full_address} icon="./map.fill.svg" isDisabled={!companyInfo?.full_address} />
          <div onClick={() => handleActionClick("workHours")}>
            <EditAction smallInfo="Часы работы" text="Смотреть все" icon="Exclude.svg" isDisabled={!companyInfo?.working_hours} />
          </div>
          <div onClick={() => handleActionClick("category")}>
            <EditAction
              smallInfo="Категория"
              text={companyInfo.subtypes
                .map((item) => {
                  return item;
                })
                .join(", ")}
              icon="./type.svg"
              isDisabled={!companyInfo?.subtypes}
            />
          </div>

          <h3 className="contacts__actions__title second__title">Контакты</h3>
          <EditAction smallInfo="Номер Telegram" text={companyInfo.social_media.telegram || "+000 000 00 00"} icon="./telegram.svg" isDisabled={!companyInfo.social_media.telegram} />
          <EditAction smallInfo="Номер WhatsApp" text={companyInfo?.social_media?.whatsApp || "+000 000 00 00"} icon="./whatsApp.svg" isDisabled={!companyInfo?.social_media?.whatsApp} />
          <EditAction smallInfo="Ссылка на Instagram " text={companyInfo?.social_media?.instagram.replace("https://www.instagram.com/", "") || "instagram.com/truegis"} icon="./instagram.svg" isDisabled={!companyInfo?.social_media?.instagram} />
          <EditAction smallInfo="Ссылка на Facebook" text={companyInfo?.social_media?.facebook || "facebook.com/truegis"} icon="./phone.svg" isDisabled={!companyInfo?.social_media?.facebook} />
          <EditAction smallInfo="Номер телефона" text={companyInfo?.phone_number || "+998 000 67 43"} icon="./phone.svg" isDisabled={!companyInfo?.full_address} />
          <EditAction smallInfo="Сайт " text={companyInfo?.website || "truegis.com"} icon="./australia.svg" isDisabled={!companyInfo?.website} />
          <EditAction smallInfo="Мобильное приложение " text="https://apps.apple.com/app/" icon="./Vector.svg" isDisabled={!companyInfo.mobile_apps?.android && !companyInfo.mobile_apps?.ios} />

          <CommonButton createdFunction={closeBottomSheet}>
            <span>Отправить</span>
          </CommonButton>
        </div>
      </BottomSheet>
      <BottomSheet isOpen={activeAction === "category"} onClose={closeBottomSheet}>
        <div className="contacts__actions">
          <div className="contacts__actions__closeButtons">
            <img src="./arrowLeft.svg" alt="back" className="contacts__actions__closeButtons__arrowLeft" onClick={() => handleActionClick("edit")} />
            <span className="contacts__actions__closeButtons__title">Категория</span>
          </div>
          <h3 className="contacts__actions__title">Категория</h3>
          <p className="contacts__actions__warning">Максимум з категории</p>

          <label className="actions pressEffefct" htmlFor="rest">
            <span className="actions__text closedButtontext">Ресторан</span>
            <span className="actions__icons closedButtonInput">
              <input type="checkbox" name="" id="rest" />
            </span>
          </label>
          <label className="actions pressEffefct" id="cafe">
            <span className="actions__text closedButtontext">Кафе</span>
            <span className="actions__icons closedButtonInput">
              <input type="checkbox" name="" id="cafe" />
            </span>
          </label>
          <label className="actions pressEffefct" htmlFor="cofe">
            <span className="actions__text closedButtontext">Кофейня</span>
            <span className="actions__icons closedButtonInput">
              <input type="checkbox" name="" id="cofe" />
            </span>
          </label>
          <label className="actions pressEffefct" htmlFor="bar">
            <span className="actions__text closedButtontext">Бар</span>
            <span className="actions__icons closedButtonInput">
              <input type="checkbox" name="" id="bar" />
            </span>
          </label>
          <label className="actions pressEffefct" id="movie">
            <span className="actions__text closedButtontext">Кинотеатр</span>
            <span className="actions__icons closedButtonInput">
              <input type="checkbox" name="" id="movie" />
            </span>
          </label>
          <label className="actions pressEffefct" htmlFor="museum">
            <span className="actions__text closedButtontext">Музей</span>
            <span className="actions__icons closedButtonInput">
              <input type="checkbox" name="" id="museum" />
            </span>
          </label>
          <label className="actions pressEffefct" htmlFor="nightBar">
            <span className="actions__text closedButtontext">Ночной клуб</span>
            <span className="actions__icons closedButtonInput">
              <input type="checkbox" name="" id="nightBar" />
            </span>
          </label>

          <CommonButton createdFunction={closeBottomSheet}>
            <span>Сохранить</span>
          </CommonButton>
        </div>
      </BottomSheet>

      <BottomSheet isOpen={activeAction === "workHours"} onClose={closeBottomSheet}>
        <div className="contacts__actions">
          <div className="contacts__actions__closeButtons">
            <img src="./arrowLeft.svg" alt="back" className="contacts__actions__closeButtons__arrowLeft" onClick={() => handleActionClick("edit")} />
            <span className="contacts__actions__closeButtons__title">Рабочие часы</span>
          </div>
          <label className="actions pressEffefct" htmlFor="chooseTime">
            <span className="actions__icons closedButtonInput">
              <input type="checkbox" name="" id="chooseTime" />
            </span>
            <span className="actions__text closedButtontext">Выбранные часы</span>
          </label>
          <label className="actions pressEffefct" id="24Hours">
            <span className="actions__icons closedButtonInput">
              <input type="checkbox" name="" id="24Hours" />
            </span>
            <span className="actions__text closedButtontext">24 часа</span>
          </label>

          {Object.entries(companyInfo.working_hours).map(([day, hours]) => (
            <div key={day}>
              <ContactsActions text={hours} mainText={day} style={"editWorkHour"} isDisabled={hours == "Выходной"} />
            </div>
          ))}

          <CommonButton createdFunction={closeBottomSheet}>
            <span>Сохранить</span>
          </CommonButton>
        </div>
      </BottomSheet>
    </>
  );
};

export default Contacts;
