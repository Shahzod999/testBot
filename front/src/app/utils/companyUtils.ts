import { useCallback } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setCompanyId } from "../../app/features/getCompanyIdSlice";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const initializeCompany = useCallback(() => {
    const initCompanyId =
      tg?.initDataUnsafe?.start_param || import.meta.env.VITE_COMPANYID;

    if (initCompanyId) {
      dispatch(setCompanyId(initCompanyId));
    }

    if (tg.version >= "6.9") {
      tg.CloudStorage.getItem("user", (error: any, value: string | null) => {
        if (error) {
          console.error("Ошибка при получении данных из CloudStorage:", error);
          return;
        }

        if (value === null || value !== "true") {
          console.log(
            "Перенаправление на /welcome, данных нет или они некорректны",
          );
          navigate("/welcome");
        } else {
          console.log("Данные найдены:", value);
        }

        console.log(value, "valueasdasds");
      });
    }
  }, [dispatch]);

  return { initializeCompany };
};
