import { useState, useMemo, useEffect, useCallback } from "react";
import "./mainInfo.scss";
import { GoBookmark } from "react-icons/go";
import { GoBookmarkFill } from "react-icons/go";
import { CompanyState } from "../../app/types/companyType";
import ActionButtons from "./ActionButtons";
import BottomSheet from "../Actions/BottomSheet";
import DistanceCalculator from "../../hooks/DistanceCalculator";
import { useFavoriteApiMutation } from "../../app/api/companySlice";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectedCompanyId } from "../../app/features/getCompanyIdSlice";
import { selectedUserLocation } from "../../app/features/userLocationSlice";
import AdressLinks from "../adressLinks/AdressLinks";
import WorkTime from "./WorkTime";
import NearestMetroHolder from "./NearestMetroHolder";
import { selectedIsDarkMode } from "../../app/features/companyStateSlice";
import Taxi from "./Taxi/Taxi";
interface ActionsState {
  text: string;
  img: string;
  key: string;
  link?: string;
}

const MainInfo = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [bookMark, setBookMark] = useState(companyInfo?.is_favorite);
  const userCoordinates = useAppSelector(selectedUserLocation);
  const companyId = useAppSelector(selectedCompanyId);
  const [favoriteApi] = useFavoriteApiMutation();

  const isDarkMode = useAppSelector(selectedIsDarkMode);

  const toggleBookMark = () => {
    try {
      const res = favoriteApi(companyId).unwrap();
      setBookMark(!bookMark);
      console.log(res);
    } catch (error) {
      console.log(error);
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

  const handleActions = useCallback((item: ActionsState) => {
    if (item.link) {
      return (window.location.href = item.link);
    }
    setActiveAction(item.key);
  }, []);

  const closeBottomSheet = useCallback(() => {
    setActiveAction(null);
  }, []);

  useEffect(() => {
    if (activeAction) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [activeAction]);

  const handleOrder = () => {
    if (companyInfo.is_accept_orders) {
      console.log("nice");
    }
    window.open(`tel:${companyInfo.phone_number}`, "_blank");
  };


  return (
    <>
      <div className="mainInfo">
        <div className="mainInfo__logo">
          <div className="mainInfo__logo__img">
            <img
              src={
                companyInfo.logoThumbnail || isDarkMode
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
            <span>Расстояние</span>
            {userCoordinates ? (
              <DistanceCalculator
                tragetLocation={companyInfo?.location?.coordinates}
                userCoordinates={userCoordinates}
              />
            ) : (
              <span>loading...</span>
            )}
          </div>
        </div>

        <div className="newYear">
          <button
            className="mainInfo__orderbutton pressEffefct"
            onClick={handleOrder}>
            <div className="newYear__button">
              <img src="./NewYear/open.png" alt="" />
            </div>
            {companyInfo.is_accept_orders ? (
              <>
                <img src="./bag.svg" alt="" />
                Заказать
              </>
            ) : (
              "Позвонить"
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
