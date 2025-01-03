import { useCallback, useEffect, useState } from "react";
import EditAction from "../contacts/EditAction";
import AddFoto from "../raiting/AddComment/AddFoto";
import { ReactSVG } from "react-svg";
import {
  CompanyState,
  MobileApps,
  PhotosSample,
  WorkingHours,
} from "../../app/types/companyType";
import "./editActions.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectedIsDarkMode } from "../../app/features/companyStateSlice";
import CommonButton from "../Actions/CommonButton";
import {
  useUpdateRequestMutation,
  useUploadImageMutation,
} from "../../app/api/companySlice";
import { selectedCompanyId } from "../../app/features/getCompanyIdSlice";
import {
  errorToast,
  infoToast,
  succesToast,
} from "../../app/features/toastSlice";
import { getValidatedUrl } from "../../hooks/imgGetValidatedUrl";

interface EditCompanyProps {
  companyInfo: CompanyState;
  handleActionClick: (key: string) => void;
  changedTotalTime: WorkingHours | undefined;
}

const EditCompany = ({
  companyInfo,
  handleActionClick,
  changedTotalTime,
}: EditCompanyProps) => {
  const dispatch = useAppDispatch();
  const companyId = useAppSelector(selectedCompanyId);
  const isDarkmode = useAppSelector(selectedIsDarkMode);

  const [newCompanyInfo, setNewCompanyInfo] = useState(companyInfo);
  const [imagesArrayNew, setimagesArrayNew] = useState<PhotosSample[]>([]);
  const [logoImg, setLogoImg] = useState<string | File>(
    companyInfo.logoThumbnail || isDarkmode
      ? companyInfo.logo_icon_dark
      : companyInfo.logo_icon_light,
  );
  const [error, setError] = useState("");

  const [updateRequest, { isLoading: updateLoading }] =
    useUpdateRequestMutation();
  const [uploadImage, { isLoading: uploadLoading }] = useUploadImageMutation();

  useEffect(() => {
    setLogoImg(
      companyInfo.logoThumbnail ||
        (isDarkmode ? companyInfo.logo_icon_dark : companyInfo.logo_icon_light),
    );

    if (companyInfo.photos_sample && companyInfo.photos_sample.length > 0) {
      const initialImages = companyInfo.photos_sample.map((photo) => ({
        photo_id: photo.photo_id,
        photo_url: photo.photo_url,
        photo_url_large: photo.photo_url_large,
      }));
      setimagesArrayNew(initialImages as any);
    }
  }, [companyInfo, isDarkmode]);

  console.log(imagesArrayNew, "999");

  const deepCopy = (obj: any): any => {
    if (typeof obj !== "object" || obj === null) return obj;
    if (Array.isArray(obj)) return obj.map(deepCopy);
    const newObj: any = {};
    Object.keys(obj).forEach((key) => {
      newObj[key] = deepCopy(obj[key]);
    });
    return newObj;
  };

  const handleEditTotalCompany = useCallback((key: string, value: string) => {
    const keys = key.split(".");
    setNewCompanyInfo((prevCompanyInfo) => {
      const updatedInfo = deepCopy(prevCompanyInfo);
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
  }, []);

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("page", "truegis");
    const response = await uploadImage(formData).unwrap();
    console.log(response, "yaaayyyu");

    return response;
  };

  const handleSubmit = async () => {
    try {
      let logo = newCompanyInfo.logo;
      let logoThumbnail = newCompanyInfo.logoThumbnail;

      if (logoImg instanceof File) {
        const logoResponse = await handleImageUpload(logoImg);
        logo = logoResponse.image;
        logoThumbnail = logoResponse.thumbnail;
      }

      const uploadedPhotos = await Promise.all(
        imagesArrayNew.map(async (image) => {
          if (image.file) {
            const { image: photoUrlLarge, thumbnail: photoUrl } =
              await handleImageUpload(image.file);
            return {
              photo_url_thumbnail: photoUrl,
              photo_url: photoUrlLarge,
              photo_url_large: photoUrlLarge,
            };
          }
          return image;
        }),
      );

      const requestData = {
        ...newCompanyInfo,
        logo,
        logoThumbnail,
        photos_sample: uploadedPhotos,
        ...(changedTotalTime ? { working_hours: changedTotalTime } : {}),
      };

      if (!newCompanyInfo.requester_name) {
        return dispatch(infoToast("Заполните поля"));
      }
      if (!newCompanyInfo.requester_phone_number) {
        return dispatch(infoToast("Заполните поля"));
      }
      if (!newCompanyInfo.requester_position) {
        return dispatch(infoToast("Заполните поля"));
      }

      console.log("Request payload:", requestData);

      const res = await updateRequest({
        id: companyId,
        data: requestData,
      }).unwrap();

      console.log(res);
      dispatch(succesToast("Успешно обновлено!"));
    } catch (error) {
      console.log(error);
      setError("Ошибка при обновлении данных");
      dispatch(errorToast("Ошибка при отправке данныхка"));
    }
    console.log(newCompanyInfo);
  };

  //t.me изменить
  console.log(logoImg, "22");

  return (
    <div className="edit">
      <div className="contacts__actions editActions">
        <div className="contacts__actions__closeButtons">
          <span className="contacts__actions__closeButtons__title">
            Редактировать <br />
            {newCompanyInfo.name}
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
      </div>
      <div className="contacts__actions editActions">
        <h3 className="contacts__actions__title second__title">Контакты</h3>
        <EditAction
          smallInfo="Ссылка на Telegram"
          text={
            newCompanyInfo.social_media.telegram?.replace("https://", "") ||
            "@User"
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
          icon="./facebook.svg"
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
      </div>

      <div className="contacts__actions editActions">
        <h3 className="contacts__actions__title second__title">
          Фото профиля заведения
        </h3>

        <div className="contacts__actions__fotoLogoEdit">
          <div className="contacts__actions__fotoLogoEdit__img">
            <img
              src={
                logoImg instanceof File
                  ? URL.createObjectURL(logoImg)
                  : getValidatedUrl(logoImg) || "./imgDefault.png"
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
      </div>
      <div className="contacts__actions editActions">
        <h3 className="contacts__actions__title second__title">
          Ваше имя
          <span>*</span>
        </h3>
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
          <span>*</span>
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
          <span>*</span>
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

        {error && <div className="errorText">{error}</div>}

        <div className="sendButton">
          <p>"Проверка информаций займёт 3 рабочих дня"</p>
          <CommonButton
            createdFunction={handleSubmit}
            disabled={updateLoading || uploadLoading}>
            <span>Отправить</span>
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default EditCompany;
