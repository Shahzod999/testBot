import { useState, useMemo, useEffect, useCallback } from "react";
import "./mainInfo.scss";
import { GoBookmark } from "react-icons/go";
import { GoBookmarkFill } from "react-icons/go";
import { CompanyState } from "../../app/types/companyType";
import ActionButtons from "./ActionButtons";
import BottomSheet from "../Actions/BottomSheet";
import { useFavoriteApiMutation } from "../../app/api/companySlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectedCompanyId } from "../../app/features/getCompanyIdSlice";
import AdressLinks from "../adressLinks/AdressLinks";
import WorkTime from "./WorkTime";
import NearestMetroHolder from "./NearestMetroHolder";
import { selectedIsDarkMode } from "../../app/features/companyStateSlice";
import Taxi from "./Taxi/Taxi";
import { ReactSVG } from "react-svg";
import { getValidatedUrl } from "../../hooks/imgGetValidatedUrl";
import { useNavigate } from "react-router-dom";
interface ActionsState {
  text: string;
  img: string;
  key: string;
  link?: string;
}

const MainInfo = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [bookMark, setBookMark] = useState(companyInfo?.is_favorite);
  const companyId = useAppSelector(selectedCompanyId);
  const [favoriteApi] = useFavoriteApiMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isDarkMode = useAppSelector(selectedIsDarkMode);

  const handleHaptic = () => {
    window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
  };

  const toggleBookMark = async () => {
    try {
      const res = await favoriteApi(companyId).unwrap();
      setBookMark((prev) => !prev);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      handleHaptic();
    }
  };

  const actions = useMemo(
    () => [
      {
        text: "Такси",
        img: "./car.fill.svg",
        key: "taxi",
      },
      ...(companyInfo?.phone_number
        ? [
            {
              text: "Чат",
              img: "./message.fill.svg",
              key: "chat",
              link: `https://t.me/${companyInfo.phone_number}`,
            },
          ]
        : []),
      {
        text: "Маршрут",
        img: "./map.fill.svg",
        key: "map",
      },
      {
        text: "Поделиться",
        img: "./Icon.svg",
        key: "share",
        link: `https://t.me/share/url?url=t.me/TrueGis_bot/start?startapp=${companyInfo?._id}`,
      },
    ],
    [companyInfo],
  );

  const tg = window.Telegram.WebApp;

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

  const handleOrder = () => {
    if (companyInfo?.has_menu) {
      navigate("/menu");
      return;
    }
    if (companyInfo?.online_menu_link) {
      window.location.href = companyInfo.online_menu_link;
      return;
    }

    window.open(`tel:${companyInfo.phone_number}`, "_blank");
  };

  useEffect(() => {
    if (activeAction) {
      tg.BackButton.show();
      tg.BackButton.onClick(() => {
        closeBottomSheet();
        tg.BackButton.offClick(closeBottomSheet);
      });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [activeAction, dispatch]);

  return (
    <>
      <div className="mainInfo">
        <div className="newYear">
          <div className="newYear__lightsMain">
            <img src="./NewYear/lightsMain.png" alt="" />
          </div>
        </div>

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
            <h2>{companyInfo.name}</h2>
            <span>{companyInfo.type}</span>
          </div>

          <span onClick={toggleBookMark} className="mainInfo__logo__bookMark">
            {bookMark ? <GoBookmarkFill /> : <GoBookmark />}
          </span>
        </div>
        {companyInfo.description ? (
          <>
            <p className="mainInfo__shortText">Коротко о заведении</p>
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
              Расстояние - {companyInfo?.distance?.distance || "loading..."}
            </div>
            <div className="mainInfo__openHours__right-duration">
              {parseFloat(companyInfo?.distance?.distance) > 2 &&
                !companyInfo?.distance?.distance.split(" ").includes("km") && (
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

        <div className="newYear">
          <button
            className="mainInfo__orderbutton pressEffefct"
            onClick={handleOrder}>
            {companyInfo?.has_menu ? (
              <>
                <ReactSVG src="./bag.svg" />
                Посмотреть меню
              </>
            ) : companyInfo?.online_menu_link ? (
              <>Посмотреть меню</>
            ) : (
              <>Позвонить</>
            )}
          </button>
        </div>

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

        {companyInfo?.nearest_metro && (
          <>
            <NearestMetroHolder
              metro={companyInfo?.nearest_metro}
              from="Ближайшее метро вам"
            />
            <NearestMetroHolder
              metro={companyInfo?.company_nearest_metro}
              from="Ближайшее метро к заведению"
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
