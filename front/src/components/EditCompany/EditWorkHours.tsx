import { useState } from "react";
import convertTo24HourFormat from "../../hooks/convertTo24HourFormat";
import { ContactsActions } from "../contacts/ContactsActions";
import TimePicker from "../TimePicker/TimePicker";
import "./editWorkHours.scss";

interface EditWorkHoursProps {
  day: string;
  hours: string;
}
const EditWorkHours = ({ day, hours }: EditWorkHoursProps) => {
  const [time, setTime] = useState(false);

  return (
    <>
      <div onClick={() => setTime(true)}>
        <ContactsActions
          text={convertTo24HourFormat(hours)}
          mainText={day}
          style={"editWorkHour"}
          isDisabled={hours == "Closed"}
          arrowRight={true}
        />
      </div>

      {time && (
        <div className="timepickerHolder" onClick={() => setTime(false)}>
          <TimePicker />
        </div>
      )}
    </>
  );
};

export default EditWorkHours;
