import { useEffect, useState } from "react";
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

  const [cur, setCur] = useState("");
  const initialTime = convertTo24HourFormat(hours).split("–");

  const [currentTime, setCurrentTime] = useState({
    openTime: {
      hour: initialTime[0].split(":")[0],
      minute: initialTime[0].split(":")[1],
    },
    closeTime: {
      hour: initialTime[1].split(":")[0],
      minute: initialTime[1].split(":")[1],
    },
  });

  const [pickerActive, setPickerActive] = useState(false);
  const [workingHour, setWorkingHour] = useState<{
    hour: number;
    minute: number;
  }>({
    hour: 0,
    minute: 0,
  });

  const handleSend = () => {
    setPickerActive(false);
    const formattedHour = workingHour.hour.toString().padStart(2, "0");
    const formattedMinute = workingHour.minute.toString().padStart(2, "0");

    if (cur == "open") {
      setCurrentTime((prevTime) => ({
        ...prevTime,
        openTime: {
          hour: formattedHour,
          minute: formattedMinute,
        },
      }));
    } else if (cur == "close") {
      setCurrentTime((prevTime) => ({
        ...prevTime,
        closeTime: {
          hour: formattedHour,
          minute: formattedMinute,
        },
      }));
    }
  };

  const handelTimeChange = (m: "open" | "close" | "") => {
    setPickerActive(true);
    setCur(m);
  };

  console.log(currentTime,'curr');

  useEffect(() => {
    if (cur === "open") {
      setWorkingHour({
        hour: parseInt(currentTime.openTime.hour, 10),
        minute: parseInt(currentTime.openTime.minute, 10),
      });
    } else if (cur === "close") {
      setWorkingHour({
        hour: parseInt(currentTime.closeTime.hour, 10),
        minute: parseInt(currentTime.closeTime.minute, 10),
      });
    }
  }, [cur]);

  return (
    <>
      <div onClick={() => setTime(true)}>
        <ContactsActions
          text={`${currentTime.openTime.hour}:${currentTime.openTime.minute}:${currentTime.closeTime.hour}:${currentTime.closeTime.minute}`}
          mainText={day}
          style={"editWorkHour"}
          isDisabled={hours == "Closed"}
          arrowRight={true}
        />
      </div>

      {time && (
        <div className="timepickerHolder" onClick={() => setTime(false)}>
          <div
            className="timepickerHolder__box"
            onClick={(e) => e.stopPropagation()}>
            <button>Круглосуточно</button>

            <div className="timepickerHolder__box__current">
              <span
                className="timepickerHolder__box__current__time"
                onClick={() => handelTimeChange("open")}>
                {currentTime.openTime.hour}:{currentTime.openTime.minute}
              </span>
              <span>|</span>
              <span
                className="timepickerHolder__box__current__time"
                onClick={() => handelTimeChange("close")}>
                {currentTime.closeTime.hour}:{currentTime.closeTime.minute}
              </span>
            </div>

            <div
              className={`timepickerHolder__box__normal timepickerHolder__box__${
                pickerActive ? "active" : "disable"
              }`}>
              <TimePicker
                workingHour={workingHour}
                setWorkingHour={setWorkingHour}
              />
            </div>

            <button onClick={handleSend}>Изменить</button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditWorkHours;
