import { useState } from "react";
import { CompanyState } from "../../app/types/companyType";
import BottomSheet from "../Actions/BottomSheet";
import CommonButton from "../Actions/CommonButton";
import EditWorkHours from "./EditWorkHours";

interface EditCompanyProps {
  activeAction: string | null;
  companyInfo: CompanyState;
  closeBottomSheet: () => void;
}

const WorkingHours = ({
  activeAction,
  closeBottomSheet,
  companyInfo,
}: EditCompanyProps) => {
  const [totalTime, setTotalTime] = useState("");

  const handleSubmit = () => {
    closeBottomSheet();
    console.log(totalTime, "qwert");
  };

  return (
    <BottomSheet
      isOpen={activeAction === "workHours"}
      onClose={closeBottomSheet}>
      <div className="contacts__actions">
        <div className="contacts__actions__closeButtons">
          <span className="contacts__actions__closeButtons__title">
            Рабочие часы
          </span>
        </div>
        <label className="actions pressEffefct" htmlFor="chooseTime">
          <span className="actions__icons closedButtonInput">
            <input type="checkbox" name="" id="chooseTime" />
          </span>
          <span className="actions__text closedButtontext">Выбранные часы</span>
        </label>
        <label className="actions pressEffefct" id="24Hours">
          <span className="actions__icons closedButtonInput">
            <input type="checkbox" name="" id="24Hours" />
          </span>
          <span className="actions__text closedButtontext">24 часа</span>
        </label>

        {Object.entries(companyInfo.working_hours).map(([day, hours]) => (
          <EditWorkHours
            day={day}
            hours={hours}
            key={day}
            setTotalTime={setTotalTime}
          />
        ))}

        <CommonButton createdFunction={handleSubmit}>
          <span>Сохранить</span>
        </CommonButton>
      </div>
    </BottomSheet>
  );
};

export default WorkingHours;
