import { useCallback, useEffect, useState } from "react";
import { selectedCompany } from "../../app/features/companyStateSlice";
import EditCompany from "../../components/EditCompany/EditCompany";
import { useAppSelector } from "../../hooks/reduxHooks";
import WorkingHoursComponent from "../../components/EditCompany/WorkingHoursComponent";
import { useNavigate } from "react-router-dom";

const EditPage = () => {
  const navigate = useNavigate();
  const companyInfo = useAppSelector(selectedCompany);

  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [changedTotalTime, setChangedTotalTime] = useState(
    companyInfo?.working_hours,
  );

  const closeBottomSheet = useCallback(() => {
    document.body.style.overflow = "";
    setActiveAction(null);
  }, []);

  const handleActionClick = useCallback((key: string | null) => {
    if (key) {
      document.body.style.overflow = "hidden";
      setActiveAction(key);
    }
  }, []);

  const handleBackButtonClick = () => {
    if (activeAction) {
      closeBottomSheet();
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.BackButton.show();
    const handleBackClick = () => {
      handleBackButtonClick();
    };
    tg.BackButton.onClick(handleBackClick);

    return () => {
      tg.BackButton.offClick(handleBackClick);
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
