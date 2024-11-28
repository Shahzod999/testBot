import MainInfo from "../../components/mainInfo/MainInfo";
import Header from "../../components/header/Header";
import "./mainPage.scss";
import { useEffect } from "react";
import Raiting from "../../components/raiting/Raiting";
import Contacts from "../../components/contacts/Contacts";
import { useGetCompanyByIdQuery } from "../../app/api/companySlice";

const tg = window.Telegram.WebApp;

const MainPage = () => {
  const { data, isLoading, isError } = useGetCompanyByIdQuery("673a89577d6d20cabf0ad3cb");

  useEffect(() => {
    tg.ready();
  }, []);

  const OnClose = () => {
    tg.close();
  };

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error...</>;
  console.log(data?.data);
  return (
    <div className="mainPage">
      <Header img={data?.data?.photos_sample} />
      <MainInfo data={data?.data} />
      <Raiting />
      <Contacts />
    </div>
  );
};

export default MainPage;
