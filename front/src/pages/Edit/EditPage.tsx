import { useCallback, useEffect, useState } from "react";
import { selectedCompany } from "../../app/features/companyStateSlice";
import EditCompany from "../../components/EditCompany/EditCompany";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import WorkingHoursComponent from "../../components/EditCompany/WorkingHoursComponent";
import { useNavigate } from "react-router-dom";
import {
  popBackButtonHandler,
  pushBackButtonHandler,
} from "../../app/features/backButtonState";

const EditPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const companyInfo = useAppSelector(selectedCompany);

  const [changedTotalTime, setChangedTotalTime] = useState(
    companyInfo?.working_hours,
  );

  const closeBottomSheet = useCallback(() => {
    document.body.style.overflow = "";
    setActiveAction(null);
    dispatch(popBackButtonHandler());
  }, [dispatch]);

  const handleActionClick = useCallback(
    (key: string | null) => {
      if (key) {
        document.body.style.overflow = "hidden";
        dispatch(pushBackButtonHandler(closeBottomSheet));
      }
      setActiveAction(key);
    },
    [dispatch, closeBottomSheet],
  );


  const handleBackButtonClick = useCallback(() => {
    if (activeAction) {
      closeBottomSheet(); // Закрываем BottomSheet
    } else {
      navigate("/"); // Навигация назад, если нет активного действия
    }
  }, [navigate, activeAction, closeBottomSheet]);



  useEffect(() => {
    // Добавляем обработчик BackButton в Telegram
    const tg = window.Telegram.WebApp;
    tg.BackButton.show();
    tg.BackButton.onClick(handleBackButtonClick);

    return () => {
      tg.BackButton.offClick(handleBackButtonClick);
    };
  }, [handleBackButtonClick]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!companyInfo) return;
  return (
    <>
      <EditCompany
        companyInfo={companyInfo}
        handleActionClick={handleActionClick}
        changedTotalTime={changedTotalTime}
      />
      <WorkingHoursComponent
        companyInfo={companyInfo}
        activeAction={activeAction}
        closeBottomSheet={closeBottomSheet}
        setChangedTotalTime={setChangedTotalTime}
      />
    </>
  );
};

export default EditPage;
