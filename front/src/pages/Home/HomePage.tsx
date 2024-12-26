import { selectedCompany } from "../../app/features/companyStateSlice";
import Contacts from "../../components/contacts/Contacts";
import FeedBack from "../../components/FeedBack/FeedBack";
import Header from "../../components/header/Header";
import MainInfo from "../../components/mainInfo/MainInfo";
import Raiting from "../../components/raiting/Raiting";
import { useAppSelector } from "../../hooks/reduxHooks";

const HomePage = () => {
  const companyInfo = useAppSelector(selectedCompany);  

  if (!companyInfo) return;
  return (
    <div>
      <Header img={companyInfo?.photos_sample || []} />
      <MainInfo companyInfo={companyInfo} />
      <Raiting companyInfo={companyInfo} />
      <FeedBack />
      <Contacts companyInfo={companyInfo} />
    </div>
  );
};

export default HomePage;
