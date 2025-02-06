import { selectedCompany } from "../../app/features/companyStateSlice";
import Contacts from "../../components/contacts/Contacts";
import Header from "../../components/header/Header";
import MainInfo from "../../components/mainInfo/MainInfo";
import Raiting from "../../components/raiting/Raiting";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Suspense, lazy, useEffect } from "react";
import "./homePage.scss";
import MoreInteres from "../../components/MoreInteres/MoreInteres";

const FeedBack = lazy(() => import("../../components/FeedBack/FeedBack"));

const HomePage = () => {
  const companyInfo = useAppSelector(selectedCompany);

  useEffect(() => {
    const tg = window.Telegram.WebApp;

    tg.BackButton.hide();
  }, []);

  if (!companyInfo) return;
  return (
    <div>
      <Header img={companyInfo?.photos_sample || []} />
      <main>
        <MainInfo companyInfo={companyInfo} />
        <MoreInteres companyInfo={companyInfo} />
        <Raiting companyInfo={companyInfo} />
        <Suspense>
          <FeedBack />
        </Suspense>
        <Contacts companyInfo={companyInfo} />
      </main>
    </div>
  );
};

export default HomePage;
