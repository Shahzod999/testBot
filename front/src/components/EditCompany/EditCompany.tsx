import { useState } from "react";
import BottomSheet from "../Actions/BottomSheet";
import EditAction from "../contacts/EditAction";
import AddFoto from "../raiting/AddComment/AddFoto";
import { ReactSVG } from "react-svg";
import { CompanyState, MobileApps } from "../../app/types/companyType";
import "./editActions.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectedIsDarkMode } from "../../app/features/companyStateSlice";
import CommonButton from "../Actions/CommonButton";
import {
  useUpdateRequestMutation,
  useUploadImageMutation,
} from "../../app/api/companySlice";
import { selectedCompanyId } from "../../app/features/getCompanyIdSlice";
import { errorToast, succesToast } from "../../app/features/toastSlice";

interface EditCompanyProps {
  activeAction: string | null;
  companyInfo: CompanyState;
  closeBottomSheet: () => void;
  handleActionClick: (key: string) => void;
}

const EditCompany = ({
  activeAction,
  companyInfo,
  closeBottomSheet,
  handleActionClick,
}: EditCompanyProps) => {
  const dispatch = useAppDispatch();
  const companyId = useAppSelector(selectedCompanyId);
  const [newCompanyInfo, setNewCompanyInfo] = useState(companyInfo);
  const [error, setError] = useState("");
  const [imagesArrayNew, setimagesArrayNew] = useState<File[]>([]);
  const isDarkmode = useAppSelector(selectedIsDarkMode);
  const [updateRequest, { isLoading }] = useUpdateRequestMutation();
  const [uploadImage] = useUploadImageMutation();

  const [logoImg, setLogoImg] = useState<string | File>(
    companyInfo.logoThumbnail || isDarkmode
      ? companyInfo.logo_icon_dark
      : companyInfo.logo_icon_light,
  );

  const deepCopy = (obj: any): any => {
    if (typeof obj !== "object" || obj === null) return obj;
    if (Array.isArray(obj)) return obj.map(deepCopy);
    const newObj: any = {};
    Object.keys(obj).forEach((key) => {
      newObj[key] = deepCopy(obj[key]);
    });
    return newObj;
  };

  const handleEditTotalCompany = (key: string, value: string) => {
    const keys = key.split(".");
    setNewCompanyInfo((prevCompanyInfo) => {
      let updatedInfo = deepCopy(prevCompanyInfo);
      keys.reduce((obj, keyPart, index) => {
        if (index === keys.length - 1) {
          obj[keyPart] = value;
        } else {
          obj[keyPart] = obj[keyPart] || {};
        }
        return obj[keyPart];
      }, updatedInfo);

      return updatedInfo;
    });
  };

  const handleSubmit = async () => {
    try {
      let logoThumbnail = newCompanyInfo.logoThumbnail;
      let uploadedUrls;

      if (logoImg instanceof File) {
        const formData = new FormData();
        formData.append("file", logoImg);
        formData.append("page", "truegis");

        const response = await uploadImage(formData).unwrap();

        logoThumbnail = response.thumbnail;
      }

      if (imagesArrayNew && imagesArrayNew.length > 0) {
        uploadedUrls = await Promise.all(
          imagesArrayNew.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("page", "truegis");
            const response = await uploadImage(formData).unwrap();

            console.log("array fotos", response);

            return {
              photo_id: response.image,
              photo_url: response.image,
              photo_url_large: response.image,
            };
          }),
        );
      }

      const requestData = {
        ...newCompanyInfo,
        logoThumbnail,
        photos_sample: uploadedUrls || [],
      };

      console.log("Request payload:", requestData);

      const res = await updateRequest({
        id: companyId,
        data: requestData,
      }).unwrap();

      console.log(res);
      dispatch(succesToast("Успешно"));
    } catch (error) {
      console.log(error);
      setError("Ошибка");
      dispatch(errorToast("Ошибка"));
    }
    console.log(newCompanyInfo);
  };

  //t.me изменить

  return (
    <BottomSheet isOpen={activeAction === "edit"} onClose={closeBottomSheet}>
      <div className="contacts__actions editActions">
        <div className="contacts__actions__closeButtons">
          <span className="contacts__actions__closeButtons__title">
            Редактировать {newCompanyInfo.name}
          </span>
        </div>
        <h3 className="contacts__actions__title">Общая информация</h3>

        <EditAction
          smallInfo="Название"
          text={newCompanyInfo?.name}
          icon="./phone.svg"
          isDisabled={!newCompanyInfo?.name}
          editable
          handleEditTotalCompany={handleEditTotalCompany}
          objectKeys="name"
        />

        <EditAction
          smallInfo="Адрес"
          text={newCompanyInfo?.full_address}
          icon="./map.fill.svg"
          isDisabled={!newCompanyInfo?.full_address}
          editable
          handleEditTotalCompany={handleEditTotalCompany}
          objectKeys="full_address"
        />
        <div onClick={() => handleActionClick("workHours")}>
          <EditAction
            smallInfo="Часы работы"
            text="Смотреть все"
            icon="Exclude.svg"
            isDisabled={!newCompanyInfo?.working_hours}
            arrowRight={true}
          />
        </div>
        {/* <div onClick={() => handleActionClick("category")}>
          <EditAction
            smallInfo="Категория"
            text={newCompanyInfo.subtypes
              .map((item) => {
                return item;
              })
              .join(", ")}
            icon="./type.svg"
            isDisabled={!newCompanyInfo?.subtypes}
            arrowRight={true}
          />
        </div> */}

        <h3 className="contacts__actions__title second__title">Контакты</h3>
        <EditAction
          smallInfo="Номер Telegram"
          text={
            newCompanyInfo.social_media.telegram?.replace("https://", "") ||
            "+000 000 00 00"
          }
          icon="./telegram.svg"
          editable
          handleEditTotalCompany={handleEditTotalCompany}
          objectKeys="social_media.telegram"
        />
        <EditAction
          smallInfo="Номер WhatsApp"
          text={newCompanyInfo?.social_media?.whatsApp || "+000 000 00 00"}
          icon="./whatsApp.svg"
          editable
          handleEditTotalCompany={handleEditTotalCompany}
          objectKeys="social_media.whatsApp"
        />
        <EditAction
          smallInfo="Ссылка на Instagram "
          text={
            newCompanyInfo?.social_media?.instagram?.replace(
              "https://www.",
              "",
            ) || "instagram.com"
          }
          icon="./instagram.svg"
          editable
          handleEditTotalCompany={handleEditTotalCompany}
          objectKeys="social_media.instagram"
        />
        <EditAction
          smallInfo="Ссылка на Facebook"
          text={
            newCompanyInfo?.social_media?.facebook?.replace("https://", "") ||
            "facebook.com/truegis"
          }
          icon="./phone.svg"
          editable
          handleEditTotalCompany={handleEditTotalCompany}
          objectKeys="social_media.facebook"
        />
        <EditAction
          smallInfo="Номер телефона"
          text={newCompanyInfo?.phone_number || "+998 000 67 43"}
          icon="./phone.svg"
          editable
          handleEditTotalCompany={handleEditTotalCompany}
          objectKeys="phone_number"
        />
        <EditAction
          smallInfo="Сайт "
          text={
            newCompanyInfo?.website?.replace("https://", "") || "truegis.com"
          }
          icon="./australia.svg"
          editable
          handleEditTotalCompany={handleEditTotalCompany}
          objectKeys="website"
        />

        {Object.keys(newCompanyInfo.mobile_apps).map((platform) => (
          <EditAction
            key={platform}
            smallInfo={`Мобильное приложение (${
              platform === "ios" ? "iOS" : "Android"
            })`}
            text={
              newCompanyInfo?.mobile_apps[platform as keyof MobileApps] ||
              `https://apps.${platform}.com/app/`
            }
            icon="./Vector.svg"
            editable
            handleEditTotalCompany={handleEditTotalCompany}
            objectKeys={`mobile_apps.${platform}`}
          />
        ))}

        <h3 className="contacts__actions__title second__title">
          Фото профиля заведения
        </h3>

        <div className="contacts__actions__fotoLogoEdit">
          <div className="contacts__actions__fotoLogoEdit__img">
            <img
              src={
                logoImg instanceof File
                  ? URL.createObjectURL(logoImg)
                  : logoImg || "./imgDefault.png"
              }
              alt=""
            />
          </div>

          <label htmlFor="addFoto__logo__img">
            <ReactSVG src="./camera.fill.svg" />
            <span>Добавить фотографию</span>
          </label>

          <input
            style={{ display: "none" }}
            accept="image/*"
            type="file"
            id="addFoto__logo__img"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setLogoImg(e.target.files[0]);
              }
            }}
          />
        </div>
        <AddFoto
          imagesArray={imagesArrayNew}
          setimagesArray={setimagesArrayNew}
          id="addContacts"
        />

        <h3 className="contacts__actions__title second__title">Ваше имя</h3>
        <input
          type="text"
          placeholder="Как ваше имя"
          className="contacts__actions__positionInput"
          required
          onChange={(e) =>
            handleEditTotalCompany("requester_name", e.target.value)
          }
        />
        <h3 className="contacts__actions__title second__title">
          Номер телефона
        </h3>

        <input
          type="text"
          placeholder="Ваш номер телефона"
          className="contacts__actions__positionInput"
          required
          onChange={(e) =>
            handleEditTotalCompany("requester_phone_number", e.target.value)
          }
        />
        <h3 className="contacts__actions__title second__title">
          Кем вы являетесь?
        </h3>
        <input
          type="text"
          placeholder="Ваша должность в этом заведении"
          className="contacts__actions__positionInput"
          required
          onChange={(e) =>
            handleEditTotalCompany("requester_position", e.target.value)
          }
        />

        {/* <h3 className="contacts__actions__title second__title">
          Оставьте комментарий
        </h3>
        <div className="contacts__actions__textArea">
          <textarea rows={5} placeholder="Что ещё нужно изменить?"></textarea>
        </div> */}

        <div className="contacts__actions__lastElement"></div>
        {error && <div className="errorText">{error}</div>}
      </div>

      <div className="sendButton">
        <p>"Проверка информаций займёт 3 рабочих дня"</p>
        <CommonButton createdFunction={handleSubmit} disabled={isLoading}>
          <span>Отправить</span>
        </CommonButton>
      </div>
    </BottomSheet>
  );
};

export default EditCompany;
