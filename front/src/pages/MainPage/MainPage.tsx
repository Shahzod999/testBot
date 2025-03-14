import { useEffect, useMemo } from "react";
import {
  useGetCompanyByIdQuery,
  useGetUserInfoQuery,
} from "../../app/api/companySlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setDarkMode } from "../../app/features/companyStateSlice";
import Skeleton from "../../components/skeleton/Skeleton";
import {
  selectedCompanyId,
  selectedUserTelegramId,
  setPlatform,
  setUserTelegramId,
} from "../../app/features/getCompanyIdSlice";
import { TelegramTypes } from "../../app/types/telegramTypes";
import { selectedUserLocation } from "../../app/features/userLocationSlice";
import CompanyLink from "../../components/CompanyLink/CompanyLink";
import { Outlet } from "react-router-dom";
// import eruda from "eruda";
import LoadingScreen from "../SmallPages/Loading/LoadingScreen";
import Confetti from "../SmallPages/welComePages/Confetti";
import Toast from "../../components/Toast/Toast";
import { useLocation } from "../../app/utils/locationUtils"; // Импортируем хук для работы с местоположением
import { useInitializeCompany } from "../../app/utils/companyUtils"; // Импортируем хук для инициализации ком
import { hapticVibration } from "../../hooks/hapticVibration";
import OrientationLock from "../../app/utils/OrientationLock";

interface TelegramTotalTypes extends TelegramTypes {
  ready: () => void;
  close: () => void;
  expand: () => void;
  requestFullscreen: () => void;
  addToHomeScreen: () => void;
  checkHomeScreenStatus(
    callback: (status: "unsupported" | "unknown" | "added" | "missed") => void,
  ): void;
}
declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramTotalTypes;
    };
  }
}

const tg = window?.Telegram?.WebApp;

const MainPage = () => {
  const dispatch = useAppDispatch();
  const companyId = useAppSelector(selectedCompanyId);
  const telegramId = useAppSelector(selectedUserTelegramId);
  const userLocation = useAppSelector(selectedUserLocation);

  const orientation = OrientationLock();
  const { handleLocation } = useLocation();
  const { initializeCompany } = useInitializeCompany();

  useGetUserInfoQuery({ id: telegramId }, { skip: !telegramId });

  useEffect(() => {
    if (!telegramId) {
      const userId =
        tg?.initDataUnsafe?.user?.id || import.meta.env.VITE_TELEGRAMID;
      if (userId) {
        dispatch(setUserTelegramId(userId));
      }
    }
    // eruda.init();
  }, [telegramId, dispatch]);

  useEffect(() => {
    tg.ready();
    tg.expand();
    orientation.init();

    const mode = tg.colorScheme == "dark";
    dispatch(setDarkMode(mode));

    initializeCompany(); // Инициализируем компанию

    handleLocation();

    dispatch(setPlatform(tg.platform));

    const requiredVersion = "8.0";
    const currentVersion = tg.version;
    if (
      currentVersion >= requiredVersion &&
      (tg.platform == "ios" || tg.platform == "android")
    ) {
      tg.requestFullscreen();
      tg.disableVerticalSwipes();

      hapticVibration("rigid");
    } else {
      console.log(
        `requestFullscreen не поддерживается в версии ${currentVersion}. Требуется версия ${requiredVersion} или выше.`,
      );
    }
  }, [dispatch, handleLocation, initializeCompany]);

  const query = useMemo(
    () => ({
      id: companyId,
      lat: userLocation.lat || import.meta.env.VITE_LAT,
      long: userLocation.lon || import.meta.env.VITE_LON,
    }),
    [userLocation, companyId],
  );

  const { isLoading, isError } = useGetCompanyByIdQuery(query, {
    skip: !companyId,
  });

  if (isLoading || isError) return <Skeleton />;
  return (
    <>
      <Toast />
      <LoadingScreen />
      <Confetti />
      <div className="mainPage">
        <Outlet />
      </div>
      <CompanyLink />
    </>
  );
};

export default MainPage;
