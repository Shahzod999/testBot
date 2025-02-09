import convertTo24HourFormat from "../../hooks/convertTo24HourFormat";
import useDayTranslator from "../../hooks/translateDay";
import { ContactsActions } from "../contacts/ContactsActions";
// import useSortedWorkingHours from "../../hooks/sortingDays";
import { WorkingHours } from "../../app/types/companyType";
// import SortDayByToday from "../../hooks/SortDayByToday";

interface WorkingHoursProps {
  working_hours: WorkingHours;
}

const WorkingHoursList = ({ working_hours }: WorkingHoursProps) => {
  // const sortedWorkingHours = useSortedWorkingHours(companyInfo?.working_hours);
  // const sortedDays = SortDayByToday(companyInfo?.working_hours);

  const translateDay = useDayTranslator();

  return (
    <div className="contacts__actions">
      {Object.entries(working_hours).map(([day, hours]) => (
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

export default WorkingHoursList;
