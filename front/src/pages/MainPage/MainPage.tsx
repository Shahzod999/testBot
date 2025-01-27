import "./mainPage.scss";
import { useEffect, useState } from "react";
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
  setCompanyId,
  setPlatform,
  setUserTelegramId,
} from "../../app/features/getCompanyIdSlice";
import { TelegramTypes } from "../../app/types/telegramTypes";
import { setuserLocation } from "../../app/features/userLocationSlice";
import CompanyLink from "../../components/CompanyLink/CompanyLink";
import Toast from "../../components/Toast/Toast";
import { Outlet, useNavigate } from "react-router-dom";
import eruda from "eruda";

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
  const navigate = useNavigate();
  const companyId = useAppSelector(selectedCompanyId);
  const telegramId = useAppSelector(selectedUserTelegramId);

  useGetUserInfoQuery({ id: telegramId }, { skip: !telegramId });

  const dispatch = useAppDispatch();
  const [loc, setLoc] = useState({ lat: 0, lon: 0 });

  useEffect(() => {
    if (!telegramId) {
      const userId =
        tg?.initDataUnsafe?.user?.id || import.meta.env.VITE_TELEGRAMID;
      if (userId) {
        dispatch(setUserTelegramId(userId));
      }
    }
    if (telegramId == "44197361") {
      eruda.init();
    }
  }, [telegramId, dispatch]);

  useEffect(() => {
    const requiredVersion = "8.0";
    const currentVersion = tg.version;
    tg.ready();
    tg.expand();

    const mode = tg.colorScheme == "dark";
    dispatch(setDarkMode(mode));

    if (tg?.LocationManager?.isAccessGranted) {
      navigate("/welcome");
    }

    tg.LocationManager.init(() => {
      console.log("LocationManager initialized.");
      if (tg?.LocationManager?.isAccessGranted == false) {
        navigate("/welcome");
      }
      tg.LocationManager.getLocation((location: any) => {
        if (
          location &&
          (location.latitude !== loc.lat || location.longitude !== loc.lon)
        ) {
          dispatch(
            setuserLocation({
              lat: location.latitude,
              lon: location.longitude,
            }),
          );
          setLoc({
            lat: location.latitude,
            lon: location.longitude,
          });
        } else {
          console.log("Location access was not granted or is unavailable.");
        }
      });
    });

    const initCompanyId =
      tg?.initDataUnsafe?.start_param || import.meta.env.VITE_COMPANYID;

    if (initCompanyId) {
      dispatch(setCompanyId(initCompanyId));
    } else {
      const storage = tg?.CloudStorage;
      if (storage) {
        storage.getItem("companyId", (error: any, value: string | null) => {
          if (error) {
            const defaultCompanyId = import.meta.env.VITE_COMPANYID;
            dispatch(setCompanyId(defaultCompanyId));
          } else if (value) {
            const data = JSON.parse(value);
            if (data?.companyId) {
              dispatch(setCompanyId(data.companyId));
            }
          } else {
            const defaultCompanyId = import.meta.env.VITE_COMPANYID;
            dispatch(setCompanyId(defaultCompanyId));
          }
        });
      } else {
        const defaultCompanyId = import.meta.env.VITE_COMPANYID;
        dispatch(setCompanyId(defaultCompanyId));
      }
    }

    // dispatch(setCompanyId(tg?.initDataUnsafe?.start_param || companyId));
    dispatch(setPlatform(tg.platform));

    if (
      currentVersion >= requiredVersion &&
      (tg.platform == "ios" || tg.platform == "android")
    ) {
      tg.requestFullscreen();
    } else {
      console.log(
        `requestFullscreen не поддерживается в версии ${currentVersion}. Требуется версия ${requiredVersion} или выше.`,
      );
    }
  }, [dispatch, companyId]);

  const { isLoading, isError } = useGetCompanyByIdQuery(
    {
      id: companyId,
      lat: loc.lat || import.meta.env.VITE_LAT,
      long: loc.lon || import.meta.env.VITE_LON,
    },
    { skip: !companyId },
  );

  if (isLoading || isError) return <Skeleton />;
  return (
    <>
      <Toast />
      <div className="mainPage">
        <Outlet />
      </div>
      <CompanyLink />
    </>
  );
};

export default MainPage;
