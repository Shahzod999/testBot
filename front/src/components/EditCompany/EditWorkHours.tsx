import { useState } from "react";
import convertTo24HourFormat from "../../hooks/convertTo24HourFormat";
import { ContactsActions } from "../contacts/ContactsActions";
import TimePicker from "../TimePicker/TimePicker";
import "./editWorkHours.scss";

interface EditWorkHoursProps {
  day: string;
  hours: string;
  setTotalTime: (prev: any) => void;
}

const EditWorkHours = ({ day, hours, setTotalTime }: EditWorkHoursProps) => {
  const [time, setTime] = useState(false);
  const [cur, setCur] = useState<"open" | "close" | "">("");

  const parseInitialTime = (hours: string) => {
    if (hours === "Closed") {
      return ["00:00", "00:00"]; // Если закрыто, возвращаем 00:00–00:00
    }
    if (hours === "Open 24 hours") {
      return ["00:00", "23:59"]; // Если 24 часа, возвращаем диапазон на весь день
    }
    const convertedTime = convertTo24HourFormat(hours);
    if (!convertedTime.includes("–")) {
      return ["00:00", "00:00"]; // Если формат некорректный, возвращаем закрыто
    }
    return convertedTime.split("–"); // Обрабатываем стандартный формат
  };

  const initialTime = parseInitialTime(hours);

  const [originalTime, setOriginalTime] = useState(initialTime);

  const [currentTime, setCurrentTime] = useState({
    openTime: {
      hour: initialTime[0]?.split(":")[0] || "00",
      minute: initialTime[0]?.split(":")[1] || "00",
    },
    closeTime: {
      hour: initialTime[1]?.split(":")[0] || "00",
      minute: initialTime[1]?.split(":")[1] || "00",
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
    const formattedHour = workingHour.hour.toString().padStart(2, "0");
    const formattedMinute = workingHour.minute.toString().padStart(2, "0");

    const updatedCurrentTime = {
      ...currentTime,
      [cur === "open" ? "openTime" : "closeTime"]: {
        hour: formattedHour,
        minute: formattedMinute,
      },
    };

    setCurrentTime(updatedCurrentTime);
    setPickerActive(false);
  };

  const handleSave = () => {
    const updatedTime = `${currentTime.openTime.hour}:${currentTime.openTime.minute}-${currentTime.closeTime.hour}:${currentTime.closeTime.minute}`;

    setTotalTime((prevTotalTime: any) => ({
      ...prevTotalTime,
      [day]: [updatedTime],
    }));

    setOriginalTime([
      `${currentTime.openTime.hour}:${currentTime.openTime.minute}`,
      `${currentTime.closeTime.hour}:${currentTime.closeTime.minute}`,
    ]);

    setTime(false);
  };

  const handleCancel = () => {
    setCurrentTime({
      openTime: {
        hour: originalTime[0]?.split(":")[0] || "00",
        minute: originalTime[0]?.split(":")[1] || "00",
      },
      closeTime: {
        hour: originalTime[1]?.split(":")[0] || "00",
        minute: originalTime[1]?.split(":")[1] || "00",
      },
    });
    setTime(false);
    setPickerActive(false);
  };

  const handleTimeChange = (m: "open" | "close") => {
    setPickerActive(true);
    setCur(m);
    setWorkingHour({
      hour: parseInt(
        currentTime[m === "open" ? "openTime" : "closeTime"].hour,
        10,
      ),
      minute: parseInt(
        currentTime[m === "open" ? "openTime" : "closeTime"].minute,
        10,
      ),
    });
  };

  return (
    <>
      <div onClick={() => setTime(true)}>
        <ContactsActions
          text={`${currentTime.openTime.hour}:${currentTime.openTime.minute}-${currentTime.closeTime.hour}:${currentTime.closeTime.minute}`}
          mainText={day}
          style={"editWorkHour"}
          isDisabled={hours === "Closed"}
          arrowRight={true}
        />
      </div>

      {time && (
        <div className="timepickerHolder" onClick={() => setTime(false)}>
          <div
            className="timepickerHolder__box"
            onClick={(e) => e.stopPropagation()}>
            <div className="switch-container">
              <span>Круглосуточно</span>
              <label className="switch">
                <input type="checkbox" />
                <span />
              </label>
            </div>

            <div className="timepickerHolder__box__current">
              <div
                className="timepickerHolder__box__current__info"
                onClick={() => handleTimeChange("open")}>
                <strong>Открытие</strong>
                <span className="timepickerHolder__box__current__info__time">
                  {currentTime.openTime.hour}:{currentTime.openTime.minute}
                </span>
              </div>

              <span className="timepickerHolder-devider"></span>

              <div
                className="timepickerHolder__box__current__info"
                onClick={() => handleTimeChange("close")}>
                <strong>Закрытие</strong>

                <span className="timepickerHolder__box__current__info__time">
                  {currentTime.closeTime.hour}:{currentTime.closeTime.minute}
                </span>
              </div>
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

            <div className="timepickerHolder__box__buttons">
              <button className="cancel" onClick={handleCancel}>
                Отменить
              </button>

              {pickerActive ? (
                <button onClick={handleSend}>Изменить</button>
              ) : (
                <button onClick={handleSave}>Сохранить</button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditWorkHours;
