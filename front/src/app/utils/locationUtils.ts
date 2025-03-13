import { useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setuserLocation } from "../../app/features/userLocationSlice";
import { useNavigate } from "react-router-dom";
import { webLocation } from "../../components/LocationNotAvailable/WebLocation";

declare const Telegram: {
  WebApp: {
    LocationManager: {
      init: (callback: () => void) => void;
      isAccessRequested: boolean;
      getLocation: (callback: (location: any) => void) => void;
    };
  };
};

const tg = window?.Telegram?.WebApp;

export const useLocation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userLocation = useAppSelector((state) => state.userLocation) as any;
  const locationRequested = useRef(false);
  const getWebLocation = webLocation();

  const handleLocation = useCallback(
    (type?: "accessByButton") => {
      if (locationRequested.current) return; // Если запрос уже выполнен, выходим
      console.log("✅WEEEAREH✅✅ччч✅✅EARE");

      const getLocation = () => {
        tg.LocationManager.getLocation((location: any) => {
          if (
            location &&
            (location.latitude !== userLocation.lat ||
              location.longitude !== userLocation.lon)
          ) {
            dispatch(
              setuserLocation({
                lat: location.latitude,
                lon: location.longitude,
              }),
            );
            locationRequested.current = true; // Устанавливаем флаг чтобы функция много раз не перезапускалась
          } else {
            console.log("Location access was not granted or is unavailable.");
          }
        });
      };

      // Если доступ уже есть, сразу получаем местоположение или через спц кнопку получаем доступ
      tg.LocationManager.init(() => {
        if (tg?.LocationManager?.isAccessGranted) {
          return getLocation();
        }
      });

      // если доступ выключен с настроек и запрос по кнопке чтобы атоматически запрос не шел то мы используем веб локацию

      if (
        tg.LocationManager.isAccessRequested &&
        !tg.LocationManager.isAccessGranted &&
        type == "accessByButton"
      ) {
        return getWebLocation();
      }

      // если пользователь впервые заходит в приложение то локацию получаем только по кнопке чтобы автоматически запрос не шел
      if (!tg.LocationManager.isAccessRequested && type == "accessByButton") {
        return getLocation();
      }
    },
    [dispatch, navigate, userLocation],
  );

  return { handleLocation };
};
