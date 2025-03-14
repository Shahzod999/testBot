import { ChangeEvent, useCallback, useEffect, useState } from "react";
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
import { useTranslation } from "react-i18next";
import { toggleLoading } from "../../app/features/bottomSheetSlice";
import { ErrorType } from "../../app/types/errorTypes";
import DropDownMenu from "../DropDownMenu/DropDownMenu";

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
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const companyId = useAppSelector(selectedCompanyId);
  const isDarkmode = useAppSelector(selectedIsDarkMode);
  const [position, setPosition] = useState("");
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
    dispatch(toggleLoading(true));
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
        return dispatch(infoToast(t("requiredFields")));
      }
      if (!newCompanyInfo.requester_phone_number) {
        return dispatch(infoToast(t("requiredFields")));
      }
      if (!newCompanyInfo.requester_position) {
        return dispatch(infoToast(t("requiredFields")));
      }

      console.log("Request payload:", requestData);

      const res = await updateRequest({
        id: companyId,
        data: requestData,
      }).unwrap();

      console.log(res);
      dispatch(succesToast(t("successfullyUpdated")));
    } catch (error: ErrorType | any) {
      setError(error?.data?.message || t("updateError"));
      dispatch(errorToast(error?.data?.message || t("updateError")));
    } finally {
      dispatch(toggleLoading(false));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    input.value = input.value.replace(/[^0-9+]/g, ""); // Удаляем все, кроме цифр и '+'

    const regex = /^\+?[0-9]{0,15}$/; // Проверяем формат
    if (regex.test(input.value)) {
      handleEditTotalCompany("requester_phone_number", input.value);
    }
  };

  const handlePositionChange = (value: string) => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setPosition(value); // Устанавливаем значение в input
    handleEditTotalCompany("requester_position", value); // Отправляем данные
  };

  return (
    <div className="edit">
      <div className="contacts__actions editActions">
        <div className="contacts__actions__closeButtons">
          <span className="contacts__actions__closeButtons__title">
            {t("editCompany")} <br />
            {newCompanyInfo.name}
          </span>
        </div>
        <h3 className="contacts__actions__title">{t("generalInfo")}</h3>

        <EditAction
          smallInfo={t("name")}
          text={newCompanyInfo?.name}
          icon="./phone.svg"
          isDisabled={!newCompanyInfo?.name}
          editable
          handleEditTotalCompany={handleEditTotalCompany}
          objectKeys="name"
          inputmode="text"
        />

        <EditAction
          smallInfo={t("address")}
          text={newCompanyInfo?.full_address}
          icon="./map.fill.svg"
          isDisabled={!newCompanyInfo?.full_address}
          editable
          handleEditTotalCompany={handleEditTotalCompany}
          objectKeys="full_address"
          inputmode="text"
        />

        <EditAction
          smallInfo={t("workingHours")}
          text={t("viewAll")}
          icon="Exclude.svg"
          isDisabled={!newCompanyInfo?.working_hours}
          arrowRight={true}
          inputmode="none"
          onClick={() => handleActionClick("workHours")}
        />
      </div>
      <div className="contacts__actions editActions">
        <h3 className="contacts__actions__title second__title">
          {t("contacts")}
        </h3>
        <EditAction
          smallInfo={t("telegramLink")}
          text={
            newCompanyInfo.social_media.telegram?.replace(
              /(https?:\/\/)?t\.me\/|@/g,
              "",
            ) || ""
          }
          icon="./telegram.svg"
          editable
          handleEditTotalCompany={handleEditTotalCompany}
          objectKeys="social_media.telegram"
          allowedValues="^[a-zA-Z][a-zA-Z0-9_]{4,}$" // Telegram username
          textStartWith="https://t.me/"
          inputmode="url"
        />
        <EditAction
          smallInfo={t("whatsAppNumber")}
          text={
            newCompanyInfo?.social_media?.whatsApp?.replace("+", "") ||
            "000 000 00 00"
          }
          icon="./whatsApp.svg"
          editable
          handleEditTotalCompany={handleEditTotalCompany}
          objectKeys="social_media.whatsApp"
          allowedValues="^\+?[0-9]{10,15}$"
          textStartWith="+"
          inputmode="tel"
        />
        <EditAction
          smallInfo={t("instagramLink")}
          text={
            newCompanyInfo?.social_media?.instagram
              ?.split("https://www.instagram.com/")[1] // Убираем начало URL
              ?.split("?")[0] || "" // Берём только первую часть (имя пользователя)
          }
          icon="./instagram.svg"
          editable
          handleEditTotalCompany={handleEditTotalCompany}
          objectKeys="social_media.instagram"
          allowedValues="^[a-zA-Z0-9_.]{1,30}$" // Instagram username
          textStartWith="https://www.instagram.com/"
          inputmode="url"
        />
        <EditAction
          smallInfo={t("facebookLink")}
          text={
            newCompanyInfo?.social_media?.facebook?.replace(
              /https?:\/\/(www\.)?facebook\.com\/([^/?#]+).*/,
              "$2",
            ) || ""
          }
          icon="./facebook.svg"
          editable
          handleEditTotalCompany={handleEditTotalCompany}
          objectKeys="social_media.facebook"
          textStartWith="https://www.facebook.com/"
          inputmode="url"
        />
        <EditAction
          smallInfo={t("phoneNumber")}
          text={newCompanyInfo?.phone_number?.replace("+", "") || ""}
          icon="./phone.svg"
          editable
          handleEditTotalCompany={handleEditTotalCompany}
          objectKeys="phone_number"
          allowedValues="^\+?[0-9]{10,15}$"
          textStartWith="+"
          inputmode="tel"
        />
        <EditAction
          smallInfo={t("website")}
          text={newCompanyInfo?.website?.replace("https://", "") || ""}
          icon="./australia.svg"
          editable
          handleEditTotalCompany={handleEditTotalCompany}
          objectKeys="website"
          textStartWith="https://"
          inputmode="url"
        />

        <EditAction
          smallInfo={t("email")}
          text={newCompanyInfo?.email || ""}
          icon="./email.svg"
          editable
          handleEditTotalCompany={handleEditTotalCompany}
          objectKeys="email"
          allowedValues="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // Email формат
          inputmode="email"
          textStartWith=""
        />

        {Object.keys(newCompanyInfo.mobile_apps).map((platform) => (
          <EditAction
            key={platform}
            smallInfo={t("mobileApp", {
              platform: platform === "ios" ? "iOS" : "Android",
            })}
            text={
              newCompanyInfo?.mobile_apps[platform as keyof MobileApps] ||
              `https://apps.${platform}.com/app/`
            }
            icon="./Vector.svg"
            editable
            handleEditTotalCompany={handleEditTotalCompany}
            objectKeys={`mobile_apps.${platform}`}
            inputmode="url"
            textStartWith=""
          />
        ))}
      </div>

      <div className="contacts__actions editActions">
        <h3 className="contacts__actions__title second__title">
          {t("profilePhoto")}
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
            <span>{t("addPhoto")}</span>
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
          {t("yourName")}
          <span>*</span>
        </h3>
        <input
          type="text"
          placeholder={t("yourName")}
          className="contacts__actions__positionInput"
          required
          onChange={(e) =>
            handleEditTotalCompany("requester_name", e.target.value)
          }
        />
        <h3 className="contacts__actions__title second__title">
          {t("yourPhoneNumber")}
          <span>*</span>
        </h3>

        <input
          type="text"
          placeholder={t("yourPhoneNumber")}
          inputMode="numeric" // Откр. цифровую клавиатуру на моб.
          pattern="[0-9]*"
          className="contacts__actions__positionInput"
          required
          onInput={handleInputChange}
        />
        <h3 className="contacts__actions__title second__title">
          {t("yourPosition")}
          <span>*</span>
        </h3>

        <div className="contacts__actions__positionInput">
          <DropDownMenu
            toggle={
              <input
                type="text"
                placeholder={t("yourPosition")}
                value={position}
                required
                onChange={(e) => handlePositionChange(e.target.value)}
              />
            }
            menu={
              <div className="positions">
                <div className="positions">
                  {["manager", "staff", "administrator", "user"].map((role) => (
                    <p key={role} onClick={() => handlePositionChange(t(role))}>
                      {t(role)}
                    </p>
                  ))}
                </div>
              </div>
            }
          />
        </div>

        {error && <div className="errorText">{error}</div>}

        <div className="sendButton">
          <p>{t("checkInfo")}</p>
          <CommonButton
            createdFunction={handleSubmit}
            disabled={updateLoading || uploadLoading}>
            <span>{t("send")}</span>
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default EditCompany;
