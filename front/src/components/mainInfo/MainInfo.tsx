import { useState, useMemo, useCallback } from "react";
import "./mainInfo.scss";
import { GoBookmark } from "react-icons/go";
import { GoBookmarkFill } from "react-icons/go";
import { CompanyState } from "../../app/types/companyType";
import ActionButtons from "./ActionButtons";
import BottomSheet from "../Actions/BottomSheet";
import { useFavoriteApiMutation } from "../../app/api/companySlice";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectedCompanyId } from "../../app/features/getCompanyIdSlice";
import AdressLinks from "../adressLinks/AdressLinks";
import WorkTime from "./WorkTime";
import NearestMetroHolder from "./NearestMetroHolder";
import { selectedIsDarkMode } from "../../app/features/companyStateSlice";
import Taxi from "./Taxi/Taxi";
import { ReactSVG } from "react-svg";
import { getValidatedUrl } from "../../hooks/imgGetValidatedUrl";
import { useNavigate } from "react-router-dom";
import { hapticVibration } from "../../hooks/hapticVibration";
import { useTranslation } from "react-i18next";
interface ActionsState {
  text: string;
  img: string;
  key: string;
  link?: string;
}

const MainInfo = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const { t } = useTranslation();
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [bookMark, setBookMark] = useState(companyInfo?.is_favorite);
  const companyId = useAppSelector(selectedCompanyId);
  const [favoriteApi] = useFavoriteApiMutation();
  const navigate = useNavigate();
  const isDarkMode = useAppSelector(selectedIsDarkMode);

  const toggleBookMark = async () => {
    try {
      const res = await favoriteApi(companyId).unwrap();
      setBookMark((prev) => !prev);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      hapticVibration("success", "light");
    }
  };

  const actions = useMemo(
    () => [
      {
        text: t("taxi"),
        img: "./car.fill.svg",
        key: "taxi",
      },
      ...(companyInfo?.phone_number
        ? [
            {
              text: t("chat"),
              img: "./message.fill.svg",
              key: "chat",
              link: `https://t.me/${companyInfo.phone_number}`,
            },
          ]
        : []),
      {
        text: t("route"),
        img: "./map.fill.svg",
        key: "map",
      },
      {
        text: t("share"),
        img: "./Icon.svg",
        key: "share",
        link: `https://t.me/share/url?url=t.me/TrueGis_bot/start?startapp=${companyInfo?._id}`,
      },
    ],
    [companyInfo],
  );

  const handleActions = useCallback(
    (item: ActionsState) => {
      if (item.link) {
        return (window.location.href = item.link);
      }
      setActiveAction(item.key);
    },
    [setActiveAction],
  );

  const closeBottomSheet = useCallback(() => {
    setActiveAction(null);
  }, []);

  const handleOrder = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (companyInfo._id == "673a8bf64ddf83aebaa1c970") {
      window.open("https://lfcapital.uz/ru/open-account/");
      return;
    }
    if (companyInfo?.has_menu) {
      navigate("/menu");
      return;
    }
    if (companyInfo?.online_menu_link) {
      window.open(companyInfo.online_menu_link);
      return;
    }
    if (companyInfo?.phone_number) {
      window.open(`tel:${companyInfo.phone_number}`, "_blank");
    }
  };

  return (
    <>
      <div className="mainInfo">
        {/* <div className="newYear">
          <div className="newYear__lightsMain">
            <img src="./NewYear/lightsMain.png" alt="" />
          </div>
        </div> */}

        <div className="mainInfo__logo">
          <div className="mainInfo__logo__img">
            <img
              src={
                companyInfo.logoThumbnail
                  ? getValidatedUrl(companyInfo.logoThumbnail)
                  : isDarkMode
                  ? companyInfo.logo_icon_dark
                  : companyInfo.logo_icon_light
              }
              alt="logo"
            />
          </div>
          <div className="mainInfo__logo__name">
            <div className="mainInfo__logo__name__partner">
              <h2>{companyInfo.name}</h2>
              {companyInfo.is_partner && <img src="./partner.png" alt="" />}
            </div>
            <span>{companyInfo.type}</span>
          </div>

          <span onClick={toggleBookMark} className="mainInfo__logo__bookMark">
            {bookMark ? <GoBookmarkFill /> : <GoBookmark />}
          </span>
        </div>
        {companyInfo.description ? (
          <>
            <p className="mainInfo__shortText">{t("shortDescription")}</p>
            <p className="mainInfo__mainText">{companyInfo.description}</p>
          </>
        ) : (
          <p className="mainInfo__shortText"></p>
        )}

        <div className="mainInfo__openHours">
          <WorkTime working_hours={companyInfo.working_hours} />
          <div className="mainInfo__openHours__divider">
            <div></div>
          </div>
          <div className="mainInfo__openHours__right">
            <div className="mainInfo__openHours__right-distance">
              {t("distance")}: {companyInfo?.distance?.distance || t("loading")}
            </div>
            <div className="mainInfo__openHours__right-duration">
              {parseFloat(companyInfo?.distance?.distance) > 2 &&
                !companyInfo?.distance?.distance
                  ?.split(" ")
                  ?.includes("km") && (
                  <>
                    <div className="mainInfo__openHours__right-duration-box">
                      <ReactSVG src="./walkPerson.svg" />
                      <span>{companyInfo?.distance?.walking_duration}</span>
                    </div>
                    •
                  </>
                )}

              <div className="mainInfo__openHours__right-duration-box">
                <ReactSVG src="./car.fill.svg" />
                <span>{companyInfo?.distance?.duration}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          className="mainInfo__orderbutton pressEffefct"
          onClick={(e) => handleOrder(e)}
          disabled={!companyInfo}>
          {companyInfo._id == "673a8bf64ddf83aebaa1c970" ? (
            t("openAccount")
          ) : companyInfo?.has_menu ? (
            <>
              <ReactSVG src="./bag.svg" />
              {t("viewMenu")}
            </>
          ) : companyInfo?.online_menu_link ? (
            t("viewMenu")
          ) : (
            t("call")
          )}
        </button>

        <div className="actionButtons">
          {actions.map((item) => (
            <button
              onClick={() => handleActions(item)}
              className="pressEffefct"
              key={item.key}>
              <ActionButtons text={item.text} icon={item.img} />
            </button>
          ))}
        </div>

        {companyInfo?.nearest_metro &&
          parseFloat(companyInfo.distance.distance) < 100 && (
            <>
              <NearestMetroHolder
                metro={companyInfo?.nearest_metro}
                from={t("nearestMetroToYou")}
              />
              <NearestMetroHolder
                metro={companyInfo?.company_nearest_metro}
                from={t("nearestMetroToLocation")}
              />
            </>
          )}
      </div>

      <Taxi
        activeAction={activeAction}
        closeBottomSheet={closeBottomSheet}
        companyInfo={companyInfo}
      />

      <BottomSheet isOpen={activeAction === "map"} onClose={closeBottomSheet}>
        <AdressLinks companyInfo={companyInfo} />
      </BottomSheet>
    </>
  );
};

export default MainInfo;
