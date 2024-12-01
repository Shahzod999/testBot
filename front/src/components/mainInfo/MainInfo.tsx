import { useState, useMemo, useEffect } from "react";
import "./mainInfo.scss";
import { GoBookmark } from "react-icons/go";
import { GoBookmarkFill } from "react-icons/go";
import { CompanyState } from "../../app/types/companyType";
import ActionButtons from "./ActionButtons";
import BottomSheet from "../Actions/BottomSheet";
import AppsSceleton from "../skeleton/AppsSkeleton";
import useGeolocation from "../../hooks/useGeolocation";
import DistanceCalculator from "../../hooks/DistanceCalculator";
interface ActionsState {
  text: string;
  img: string;
  key: string;
  link?: string;
}

const MainInfo = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [bookMark, setBookMark] = useState(false);
  const { location, error } = useGeolocation();
  const userCoordinates = { lat: location?.latitude, lon: location?.longitude };

  const toggleBookMark = () => {
    setBookMark(!bookMark);
  };

  const actions = useMemo(
    () => [
      {
        text: "Такси",
        img: "./car.fill.svg",
        key: "taxi",
      },
      {
        text: "Чат",
        img: "./message.fill.svg",
        key: "chat",
      },
      {
        text: "Маршрут",
        img: "./map.fill.svg",
        key: "map",
      },
      {
        text: "Поделиться",
        img: "./Icon.svg",
        key: "share",
        link: `https://t.me/share/url?url=t.me/TrueGis_bot/start?startapp=${companyInfo._id}`,
      },
    ],
    [companyInfo],
  );

  const handleActions = (item: ActionsState) => {
    if (item.link) {
      window.location.href = item.link;
    }
    setActiveAction(item.key);
  };

  const closeBottomSheet = () => setActiveAction(null);

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [activeAction]);

  console.log(companyInfo.location.coordinates);
  

  return (
    <>
      <div className="mainInfo">
        <div className="mainInfo__logo">
          <div className="mainInfo__logo__img">
            <img
              src={companyInfo.logoThumbnail || "./imgDefault.png"}
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
          <div className="mainInfo__openHours__left">
            <span>Открыто</span>
            <p>До 22:00</p>
          </div>
          <div className="mainInfo__openHours__divider">
            <div></div>
          </div>
          <div className="mainInfo__openHours__right">
            <span>Расстояние</span>
            {location ? (
              <DistanceCalculator tragetLocation={companyInfo?.location?.coordinates}  userCoordinates={userCoordinates} />
            ) : (
              error
            )}
          </div>
        </div>

        <button className="mainInfo__orderbutton pressEffefct">
          <img src="./bag.svg" alt="" />
          Заказать
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
      </div>

      <BottomSheet isOpen={!!activeAction} onClose={closeBottomSheet}>
        {isLoading ? (
          <AppsSceleton />
        ) : (
          <>
            {activeAction === "taxi" && (
              <div className="socialMedia">
                <div className="socialMedia__icons">
                  <a
                    href={companyInfo.mobile_apps?.android}
                    target="_blank"
                    rel="noopener noreferrer">
                    <div className="socialMedia__icons__logo">
                      <img src="./yandexGo.png" alt="" />
                    </div>
                    <span>Yandex Go</span>
                  </a>
                  <a
                    href={companyInfo.mobile_apps?.ios}
                    target="_blank"
                    rel="noopener noreferrer">
                    <div className="socialMedia__icons__logo">
                      <img src="./fasten.png" alt="" />
                    </div>
                    <span>Fasten</span>
                  </a>
                  <a
                    href={companyInfo.mobile_apps?.ios}
                    target="_blank"
                    rel="noopener noreferrer">
                    <div className="socialMedia__icons__logo">
                      <img src="./mytaxi.png" alt="" />
                    </div>
                    <span>My Taxi</span>
                  </a>
                  <a
                    href={companyInfo.mobile_apps?.ios}
                    target="_blank"
                    rel="noopener noreferrer">
                    <div className="socialMedia__icons__logo">
                      <img src="./uklon.png" alt="" />
                    </div>
                    <span>Uklon</span>
                  </a>
                </div>
              </div>
            )}
            {activeAction === "chat" && (
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
                          <img src={`./${name}.png`} alt="" />
                        </div>
                        <span>{name}</span>
                      </a>
                    ))}
                </div>
              </div>
            )}
            {activeAction === "share" && (
              <div className="socialMedia">
                <h3>Поделитесь этим!</h3>
              </div>
            )}
          </>
        )}
      </BottomSheet>
    </>
  );
};

export default MainInfo;
