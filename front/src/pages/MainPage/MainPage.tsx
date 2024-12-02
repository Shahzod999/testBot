import MainInfo from "../../components/mainInfo/MainInfo";
import Header from "../../components/header/Header";
import "./mainPage.scss";
import { useEffect } from "react";
import Raiting from "../../components/raiting/Raiting";
import Contacts from "../../components/contacts/Contacts";
import { useGetCompanyByIdQuery } from "../../app/api/companySlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setCompany } from "../../app/features/companyStateSlice";
import Skeleton from "../../components/skeleton/Skeleton";

export {};

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        close: () => void;
        expand: () => void;
        requestFullscreen: () => void;
        version: string;
        initData: string;
        initDataUnsafe: Record<string, unknown>;
      };
    };
  }
}

const tg = window.Telegram.WebApp;

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetCompanyByIdQuery("673a89567d6d20cabf0ad3bb");

  useEffect(() => {
    dispatch(setCompany(data?.data));
  }, [data, dispatch]);

  useEffect(() => {
    const requiredVersion = "7.0";
    const currentVersion = window.Telegram.WebApp.version;
    tg.ready();
    tg.expand();

    if (currentVersion > requiredVersion) {
      tg.requestFullscreen();
    } else {
      console.log(`requestFullscreen не поддерживается в версии ${currentVersion}. Требуется версия ${requiredVersion} или выше.`);
    }
  }, []);

  if (isLoading) return <Skeleton />;
  if (isError) return <Skeleton />;
  return (
    <div className="mainPage">
      <Header img={data?.data?.photos_sample || []} />
      <MainInfo companyInfo={data?.data} />
      <Raiting companyInfo={data?.data} />
      <Contacts companyInfo={data?.data} />
    </div>
  );
};

export default MainPage;
