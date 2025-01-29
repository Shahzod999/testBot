import { useState } from "react";
import { CompanyState, WorkingHours } from "../../app/types/companyType";
import BottomSheet from "../Actions/BottomSheet";
import CommonButton from "../Actions/CommonButton";
import EditWorkHours from "./EditWorkHours";
import convertTo24HourFormat from "../../hooks/convertTo24HourFormat";
import useSortedWorkingHours from "../../hooks/sortingDays";
import { hapticVibration } from "../../hooks/hapticVibration";
import { useTranslation } from "react-i18next";

interface EditCompanyProps {
  activeAction: string | null;
  companyInfo: CompanyState;
  closeBottomSheet: () => void;
  setChangedTotalTime: (value: WorkingHours) => void;
}

const WorkingHoursComponent = ({
  activeAction,
  closeBottomSheet,
  companyInfo,
  setChangedTotalTime,
}: EditCompanyProps) => {
  const sortedWorkingHours = useSortedWorkingHours(companyInfo?.working_hours);
  const [totalTime, setTotalTime] = useState(sortedWorkingHours);

  

  const { t } = useTranslation();
  const handleSubmit = () => {
    handleTime();
    closeBottomSheet();
    setChangedTotalTime({ ...companyInfo?.working_hours, ...totalTime });
  };

  const handleTime = () => {
    hapticVibration("success", "light");
  };


  console.log(totalTime);
  
  return (
    <BottomSheet
      isOpen={activeAction === "workHours"}
      onClose={closeBottomSheet}>
      <div className="contacts__actions">
        <div className="contacts__actions__closeButtons">
          <span className="contacts__actions__closeButtons__title">
            {t("workingHours")}
          </span>
        </div>

        <label
          className="actions pressEffefct"
          htmlFor="chooseTime"
          onClick={handleTime}>
          <span className="actions__icons closedButtonInput">
            <input type="checkbox" name="" id="chooseTime" />
          </span>
          <span className="actions__text closedButtontext">
            {t("selectedHours")}
          </span>
        </label>

        <label
          className="actions pressEffefct"
          id="24Hours"
          onClick={handleTime}>
          <span className="actions__icons closedButtonInput">
            <input type="checkbox" name="" id="24Hours" />
          </span>
          <span className="actions__text closedButtontext">
            {t("open24Hours")}
          </span>
        </label>

        {Object.entries(totalTime).map(([day, hours]) => (
          <EditWorkHours
            day={day}
            hours={convertTo24HourFormat(hours)}
            key={day}
            setTotalTime={setTotalTime}
          />
        ))}

        <CommonButton createdFunction={handleSubmit}>
          <span>{t("save")}</span>
        </CommonButton>
      </div>
    </BottomSheet>
  );
};

export default WorkingHoursComponent;
