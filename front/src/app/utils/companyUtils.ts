import { useCallback } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setCompanyId } from "../../app/features/getCompanyIdSlice";

declare const Telegram: {
  WebApp: {
    initDataUnsafe: {
      start_param?: string;
    };
    CloudStorage: {
      getItem: (
        key: string,
        callback: (error: any, value: string | null) => void,
      ) => void;
    };
  };
};

const tg = window?.Telegram?.WebApp;

export const useInitializeCompany = () => {
  const dispatch = useAppDispatch();

  const initializeCompany = useCallback(() => {
    const initCompanyId = tg?.initDataUnsafe?.start_param || import.meta.env.VITE_COMPANYID;

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
  }, [dispatch]);

  return { initializeCompany };
};