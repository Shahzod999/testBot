import { useCallback } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setuserLocation } from "../../app/features/userLocationSlice";
import { infoToast } from "../../app/features/toastSlice";
import { useTranslation } from "react-i18next";

export const webLocation = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const requestLocation = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            setuserLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            }),
          );
        },
        () => {
          dispatch(infoToast(t("errorGeolocation")));
        },
      );
    } else {
      console.error("Геолокация не поддерживается");
    }
  }, [dispatch, t]);

  return requestLocation;
};
