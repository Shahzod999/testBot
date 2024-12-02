import { useState, useMemo, useCallback, useEffect } from "react";
import { ContactsActions } from "./ContactsActions";
import "./contacts.scss";
import { CompanyState } from "../../app/types/companyType";
import BottomSheet from "../Actions/BottomSheet";
import CommonButton from "../Actions/CommonButton";
import Cross from "../raiting/AddComment/Cross";
import EditAction from "./EditAction";
import AddFoto from "../raiting/AddComment/AddFoto";
import SendButton from "../raiting/AddComment/SendButton";
import { ReactSVG } from "react-svg";
import Lottie from "lottie-react";
import notFound from "../../../public/notFound.json";

const getAvailableSocialMedia = (socialMedia: Record<string, string | any | null>): string => {
  const names = Object.entries(socialMedia)
    .filter(([_, url]) => url)
    .map(([name]) => name);
  return names.length > 0 ? names.join(", ") : "Соцсети не указаны";
};

const Contacts = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const [error, setError] = useState("");
  const [imagesArrayNew, setimagesArrayNew] = useState<string[]>([]);
  const [logoImg, setLogoImg] = useState(companyInfo?.logoThumbnail);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const actions = useMemo(
    () => [
      {
        text: "Скачать приложения",
        secondText: "Мобильное приложение заведении",
        icon: "./Vector.svg",
        isDisabled: !companyInfo.mobile_apps?.android && !companyInfo.mobile_apps?.ios,
        key: "apps",
      },
      {
        text: getAvailableSocialMedia(companyInfo.social_media || {}) || "Нет Сетей",
        secondText: "Переход на страницы",
        icon: "smileCircle.svg",
        isDisabled: !Object.values(companyInfo.social_media || {}).some((url) => url),
        key: "socialMedia",
      },
      {
        text: companyInfo?.phone_number || "Нет Номера",
        icon: "phone.svg",
        isDisabled: !companyInfo?.phone_number,
        // key: "phone",
        phone: companyInfo?.phone_number ? `tel:${companyInfo.phone_number}` : null,
      },
      {
        text: companyInfo?.website?.replace("https://", "") || "Нет Сайта",
        isDisabled: !companyInfo.website,
        icon: "australia.svg",
        // key: "map",
        phone: companyInfo?.website ? companyInfo.website : null,
      },
      {
        text: "Открыто до 22:00",
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
    [companyInfo]
  );

  const handleImagePreview = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        setError("File is too large");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setLogoImg(reader.result as string);
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    }
  }, []);

  const handleActionClick = useCallback((key: string | null) => {
    console.log(key);

    if (key) {
      document.body.style.overflow = "hidden";
    }
    setActiveAction(key);
  }, []);

  const closeBottomSheet = useCallback(() => {
    document.body.style.overflow = "";
    setActiveAction(null);
  }, []);

  // useEffect(() => {
  //   if (activeAction) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "";
  //   }
  // }, [activeAction]);

  console.log(companyInfo);

  if (!companyInfo) return null;

  return (
    <>
      <div className="contacts">
        <div className="contacts__header">
          <h2>Контакты</h2>
          <button className="pressEffefct" onClick={() => handleActionClick("edit")}>
            <ReactSVG src="./edit.svg" />
            Редактировать
          </button>
        </div>
        <div className="contacts__actions">
          {actions.map(({ text, icon, isDisabled, key, phone }, index) => (
            <div onClick={() => !isDisabled && handleActionClick(key || null)} key={index}>
              <ContactsActions text={text} icon={icon} isDisabled={isDisabled} arrowRight={true} phone={phone} />
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
              <ContactsActions time={true} text={hours} mainText={day} style={"workHour"} isDisabled={hours == "Выходной"} />
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
            <EditAction smallInfo="Часы работы" text="Смотреть все" icon="Exclude.svg" isDisabled={!companyInfo?.working_hours} arrowRight={true} />
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
              arrowRight={true}
            />
          </div>

          <h3 className="contacts__actions__title second__title">Контакты</h3>
          <EditAction smallInfo="Номер Telegram" text={companyInfo.social_media.telegram?.replace("https://", "") || "+000 000 00 00"} icon="./telegram.svg" isDisabled={!companyInfo.social_media.telegram} arrowRight={true} />
          <EditAction smallInfo="Номер WhatsApp" text={companyInfo?.social_media?.whatsApp || "+000 000 00 00"} icon="./whatsApp.svg" isDisabled={!companyInfo?.social_media?.whatsApp} arrowRight={true} />
          <EditAction smallInfo="Ссылка на Instagram " text={companyInfo?.social_media?.instagram?.replace("https://www.", "") || "instagram.com"} icon="./instagram.svg" isDisabled={!companyInfo?.social_media?.instagram} arrowRight={true} />
          <EditAction smallInfo="Ссылка на Facebook" text={companyInfo?.social_media?.facebook?.replace("https://", "") || "facebook.com/truegis"} icon="./phone.svg" isDisabled={!companyInfo?.social_media?.facebook} arrowRight={true} />
          <EditAction smallInfo="Номер телефона" text={companyInfo?.phone_number || "+998 000 67 43"} icon="./phone.svg" isDisabled={!companyInfo?.full_address} arrowRight={true} />
          <EditAction smallInfo="Сайт " text={companyInfo?.website?.replace("https://", "") || "truegis.com"} icon="./australia.svg" isDisabled={!companyInfo?.website} arrowRight={true} />

          <EditAction smallInfo="Мобильное приложение " text="https://apps.apple.com/app/" icon="./Vector.svg" isDisabled={!companyInfo.mobile_apps?.android && !companyInfo.mobile_apps?.ios} arrowRight={true} />
          {/*  */}
          <h3 className="contacts__actions__title second__title">Кем вы являетесь?</h3>

          <input type="text" placeholder="Ваша должность в этом заведении" className="contacts__actions__positionInput" />

          <h3 className="contacts__actions__title second__title">Фото профиля заведения</h3>

          <div className="contacts__actions__fotoLogoEdit">
            <div className="contacts__actions__fotoLogoEdit__img">
              <img src={logoImg || "./imgDefault.png"} alt="" />
            </div>

            <label htmlFor="addFoto__logo__img">
              <img src="./camera.fill.svg" alt="" />
              <span>Добавить фотографию</span>
            </label>

            <input
              style={{ display: "none" }}
              accept="image/*"
              type="file"
              id="addFoto__logo__img"
              onChange={(e) => {
                handleImagePreview(e);
              }}
            />
          </div>
          <AddFoto imagesArray={imagesArrayNew} setimagesArray={setimagesArrayNew} id="addContacts" />

          <h3 className="contacts__actions__title second__title">Оставьте комментарий</h3>
          <div className="contacts__actions__textArea">
            <textarea rows={5} placeholder="Что ещё нужно изменить?"></textarea>
          </div>

          <div className="contacts__actions__lastElement"></div>
          {/*  */}
          {error && <div className="errorText">{error}</div>}
        </div>
        <SendButton text="Проверка информаций займёт 3 рабочих дня" />
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
              <ContactsActions text={hours} mainText={day} style={"editWorkHour"} isDisabled={hours == "Closed"} time={true} arrowRight={true} />
            </div>
          ))}

          <CommonButton createdFunction={closeBottomSheet}>
            <span>Сохранить</span>
          </CommonButton>
        </div>
      </BottomSheet>
      <BottomSheet isOpen={activeAction === "person"} onClose={closeBottomSheet}>
        <div className="socialMedia">
          <h3>Вакансии</h3>
          <Lottie animationData={notFound} />
        </div>
      </BottomSheet>
    </>
  );
};

export default Contacts;
