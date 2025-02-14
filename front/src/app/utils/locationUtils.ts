import { useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setuserLocation } from "../../app/features/userLocationSlice";
import { useNavigate } from "react-router-dom";

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
  const userLocation = useAppSelector((state) => state.userLocation) as any
  const locationRequested = useRef(false);

  const handleLocation = useCallback(() => {
    if (locationRequested.current) return; // Если запрос уже выполнен, выходим
    locationRequested.current = true; // Устанавливаем флаг

    tg.LocationManager.init(() => {
      if (tg?.LocationManager?.isAccessRequested === false) {
        navigate("/welcome");
      }
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
        } else {
          console.log("Location access was not granted or is unavailable.");
        }
      });
    });
  }, [dispatch, navigate, userLocation]);

  return { handleLocation };
};
