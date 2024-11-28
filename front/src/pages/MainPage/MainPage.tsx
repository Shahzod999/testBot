import MainInfo from "../../components/mainInfo/MainInfo";
import Header from "../../components/header/Header";
import "./mainPage.scss";
import { useEffect } from "react";
import Raiting from "../../components/raiting/Raiting";
import Contacts from "../../components/contacts/Contacts";
import { useGetCompanyByIdQuery } from "../../app/api/companySlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  selectedCompany,
  setCompany,
} from "../../app/features/companyStateSlice";

const tg = window.Telegram.WebApp;

const MainPage = () => {
  const dispatch = useAppDispatch();
  const company = useAppSelector(selectedCompany);
  const { data, isLoading, isError } = useGetCompanyByIdQuery(
    "673a89577d6d20cabf0ad3cb",
  );

  useEffect(() => {
    dispatch(setCompany(data?.data));
  }, [data, dispatch]);

  useEffect(() => {
    tg.ready();
  }, []);

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error...</>;
  console.log(company, "state");
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
