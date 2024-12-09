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
  selectedUserTelegramId,
  setCompanyId,
  setUserTelegramId,
} from "../../app/features/getCompanyIdSlice";

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        close: () => void;
        expand: () => void;
        requestFullscreen: () => void;
        version: string;
        initDataUnsafe: {
          start_param?: string;
          user?: {
            id: number;
            isBot?: boolean;
            first_name?: string;
            last_name?: string;
            username?: string;
            language_code: string;
          };
        };
      };
    };
  }
}

const tg = window.Telegram.WebApp;

const MainPage = () => {
  const companyId = useAppSelector(selectedCompanyId);
  const userTelegramId = useAppSelector(selectedUserTelegramId);

  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetCompanyByIdQuery(
    tg?.initDataUnsafe?.start_param ? tg.initDataUnsafe.start_param : companyId,
  );


  useEffect(() => {
    dispatch(setCompany(data?.data));
  }, [data, dispatch]);

  useEffect(() => {
    const requiredVersion = "7.0";
    const currentVersion = tg.version;
    tg.ready();
    tg.expand();
    dispatch(
      setCompanyId(
        tg?.initDataUnsafe?.start_param
          ? tg.initDataUnsafe.start_param
          : companyId,
      ),
    );

    dispatch(setUserTelegramId(tg?.initDataUnsafe?.user?.id || "11"));

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
      <h1 style={{ color: "white" }}>{userTelegramId}</h1>

      <FeedBack />
      <Contacts companyInfo={data?.data} />
    </div>
  );
};

export default MainPage;
