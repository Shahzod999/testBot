import convertTo24HourFormat from "../../hooks/convertTo24HourFormat";
import useDayTranslator from "../../hooks/translateDay";
import { ContactsActions } from "../contacts/ContactsActions";
import useSortedWorkingHours from "../../hooks/sortingDays";
import { CompanyState } from "../../app/types/companyType";

interface WorkingHoursProps {
  companyInfo: CompanyState;
}

const WorkingHours = ({ companyInfo }: WorkingHoursProps) => {
  const sortedWorkingHours = useSortedWorkingHours(companyInfo?.working_hours);

  const translateDay = useDayTranslator();

  return (
    <div className="contacts__actions">
      {Object.entries(sortedWorkingHours).map(([day, hours]) => (
        <ContactsActions
          text={convertTo24HourFormat(hours)}
          mainText={translateDay(day)}
          style={"editWorkHour"}
          isDisabled={hours == "Closed"}
          key={day}
        />
      ))}
    </div>
  );
};

export default WorkingHours;
