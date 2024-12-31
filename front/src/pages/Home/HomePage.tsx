import { selectedCompany } from "../../app/features/companyStateSlice";
import Contacts from "../../components/contacts/Contacts";
import Header from "../../components/header/Header";
import MainInfo from "../../components/mainInfo/MainInfo";
import Raiting from "../../components/raiting/Raiting";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Suspense, lazy } from "react";

const FeedBack = lazy(() => import("../../components/FeedBack/FeedBack"));

const HomePage = () => {
  const companyInfo = useAppSelector(selectedCompany);

  console.log(companyInfo, "222");

  if (!companyInfo) return;
  return (
    <div>
      <Header img={companyInfo?.photos_sample || []} />
      <MainInfo companyInfo={companyInfo} />
      <Raiting companyInfo={companyInfo} />
      <Suspense>
        <FeedBack />
      </Suspense>
      <Contacts companyInfo={companyInfo} />
    </div>
  );
};

export default HomePage;
