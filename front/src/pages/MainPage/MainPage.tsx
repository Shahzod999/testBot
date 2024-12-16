import MainInfo from "../../components/mainInfo/MainInfo";
import Header from "../../components/header/Header";
import "./mainPage.scss";
import { useEffect } from "react";
import Raiting from "../../components/raiting/Raiting";
import Contacts from "../../components/contacts/Contacts";
import { useGetCompanyByIdQuery } from "../../app/api/companySlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setCompany } from "../../app/features/companyStateSlice";
import Skeleton from "../../components/skeleton/Skeleton";
import FeedBack from "../../components/FeedBack/FeedBack";
import {
  selectedCompanyId,
  setCompanyId,
  setUserTelegramId,
} from "../../app/features/getCompanyIdSlice";
import { TelegramTypes } from "../../app/types/telegramTypes";
import { selectedUserLocation, setuserLocation } from "../../app/features/userLocationSlice";
import CompanyLink from "../../components/CompanyLink/CompanyLink";

interface TelegramTotalTypes extends TelegramTypes {
  ready: () => void;
  close: () => void;
  expand: () => void;
  requestFullscreen: () => void;
}
declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramTotalTypes;
    };
  }
}

const tg = window.Telegram.WebApp;

const MainPage = () => {
  const companyId = useAppSelector(selectedCompanyId);
  const dispatch = useAppDispatch();
  const userLocation = useAppSelector(selectedUserLocation)
  const { data, isLoading, isError } = useGetCompanyByIdQuery({
    id: tg?.initDataUnsafe?.start_param || companyId,
    lat: userLocation.lat,
    long: userLocation.lon,
  });

  dispatch(setUserTelegramId(tg?.initDataUnsafe?.user?.id || "44197361"));

  useEffect(() => {
    dispatch(setCompany(data?.data));
  }, [data, dispatch]);

  useEffect(() => {
    const requiredVersion = "7.0";
    const currentVersion = tg.version;
    tg.ready();
    tg.expand();

    tg.LocationManager.init(() => {
      console.log("LocationManager initialized.");
      tg.LocationManager.getLocation((location: any) => {
        if (location) {
          dispatch(
            setuserLocation({
              lat: location.latitude,
              lon: location.longitude,
            }),
          );
          console.log("Latitude:", location.latitude);
          console.log("Longitude:", location.longitude);
        } else {
          console.log("Location access was not granted or is unavailable.");
        }
      });
    });

    dispatch(
      setCompanyId(
        tg?.initDataUnsafe?.start_param
          ? tg.initDataUnsafe.start_param
          : companyId,
      ),
    );

    if (currentVersion > requiredVersion) {
      tg.requestFullscreen();
    } else {
      console.log(
        `requestFullscreen не поддерживается в версии ${currentVersion}. Требуется версия ${requiredVersion} или выше.`,
      );
    }
  }, []);

  if (isLoading) return <Skeleton />;
  if (isError) return <Skeleton />;
  return (
    <div className="mainPage">
      <Header img={data?.data?.photos_sample || []} />
      <MainInfo companyInfo={data?.data} />
      <Raiting companyInfo={data?.data} />
      <FeedBack />
      <Contacts companyInfo={data?.data} />
      <CompanyLink />
    </div>
  );
};

export default MainPage;
