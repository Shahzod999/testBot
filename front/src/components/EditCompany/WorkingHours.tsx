import { CompanyState } from "../../app/types/companyType";
import convertTo24HourFormat from "../../hooks/convertTo24HourFormat";
import BottomSheet from "../Actions/BottomSheet";
import CommonButton from "../Actions/CommonButton";
import { ContactsActions } from "../contacts/ContactsActions";

interface EditCompanyProps {
  activeAction: string | null;
  companyInfo: CompanyState;
  closeBottomSheet: () => void;
  handleActionClick: (key: string) => void;
}

const WorkingHours = ({
  activeAction,
  closeBottomSheet,
  handleActionClick,
  companyInfo,
}: EditCompanyProps) => {
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
          <div key={day}>
            <ContactsActions
              text={convertTo24HourFormat(hours)}
              mainText={day}
              style={"editWorkHour"}
              isDisabled={hours == "Closed"}
              arrowRight={true}
            />
          </div>
        ))}

        <CommonButton createdFunction={() => handleActionClick("edit")}>
          <span>Сохранить</span>
        </CommonButton>
      </div>
    </BottomSheet>
  );
};

export default WorkingHours;
