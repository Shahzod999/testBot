import { useState } from "react";
import { ContactsActions } from "../contacts/ContactsActions";
import TimePicker from "../TimePicker/TimePicker";
import "./editWorkHours.scss";
import BottomSheet from "../Actions/BottomSheet";
import { WorkingHours } from "../../app/types/companyType";
import convertTo12HourFormat from "../../hooks/convertingTo12HoursFormat";
import { useAppDispatch } from "../../hooks/reduxHooks";
import {
  popBackButtonHandler,
  pushBackButtonHandler,
} from "../../app/features/backButtonState";
import useDayTranslator from "../../hooks/translateDay";

interface EditWorkHoursProps {
  day: string;
  hours: string;
  setTotalTime: (prev: any) => void;
}

const EditWorkHours = ({ day, hours, setTotalTime }: EditWorkHoursProps) => {
  const dispatch = useAppDispatch();
  const translateDay = useDayTranslator();
  const translatedToday = translateDay(day);

  const [time, setTime] = useState(false);
  const [offDay, setOffDay] = useState(hours !== "Закрыто");

  const editedHours = hours.split("–");

  const [workingHour, setWorkingHour] = useState({
    hour: parseInt(editedHours[0]?.split(":")[0] || "0", 10),
    minute: parseInt(editedHours[0]?.split(":")[1] || "0", 10),
  });

  const [closingWorkingHour, setClosingWorkingHour] = useState({
    hour: parseInt(editedHours[1]?.split(":")[0] || "0", 10),
    minute: parseInt(editedHours[1]?.split(":")[1] || "0", 10),
  });

  const formatTime = (hour: number, minute: number) =>
    `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

  const updatedTime = `${formatTime(
    workingHour.hour,
    workingHour.minute,
  )}-${formatTime(closingWorkingHour.hour, closingWorkingHour.minute)}`;

  const handleSave = () => {
    if (!offDay) {
      setTotalTime((prev: WorkingHours) => ({ ...prev, [day]: ["Closed"] }));
    } else {
      const fotmated = convertTo12HourFormat(updatedTime);
      setTotalTime((prev: WorkingHours) => ({ ...prev, [day]: [fotmated] }));
    }
    setTime(false);
    dispatch(popBackButtonHandler());
  };

  const handleToAllDays = () => {
    if (!offDay) {
      setTotalTime((prev: WorkingHours) => {
        const updatedTimeForAllDays = Object.keys(prev).reduce(
          (acc, currentDay) => {
            acc[currentDay as keyof WorkingHours] = ["Closed"];
            return acc;
          },
          {} as WorkingHours,
        );
        return { ...prev, ...updatedTimeForAllDays };
      });
    } else {
      const fotmated = convertTo12HourFormat(updatedTime);
      setTotalTime((prev: WorkingHours) => {
        const updatedTimeForAllDays = Object.keys(prev).reduce(
          (acc, currentDay) => {
            acc[currentDay as keyof WorkingHours] = [fotmated];
            return acc;
          },
          {} as WorkingHours,
        );
        return { ...prev, ...updatedTimeForAllDays };
      });
    }

    setTime(false);
    dispatch(popBackButtonHandler());
  };
  const tg = window.Telegram.WebApp;

  const openTime = () => {
    tg.BackButton.onClick(closeTime);
    dispatch(
      pushBackButtonHandler({ id: "editWorkHours", callback: closeTime }),
    ); // Добавляем обработчик в стек
    setTime(true);
  };

  const closeTime = () => {
    tg.BackButton.show();
    setTime(false);
    dispatch(popBackButtonHandler());
  };

  const handleSetOffDay = () => {
    handleHaptic();
    setOffDay(!offDay);
  };

  const handleHaptic = () => {
    window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
  };
  return (
    <>
      <div onClick={openTime}>
        <ContactsActions
          text={hours}
          mainText={translatedToday}
          style={"editWorkHour"}
          isDisabled={hours === "Closed"}
          arrowRight={true}
        />
      </div>

      <BottomSheet isOpen={time} onClose={closeTime}>
        <div className="timepickerHolder">
          <div
            className="timepickerHolder__box"
            onClick={(e) => e.stopPropagation()}>
            <div className="switch-container">
              <div className="switch-container__title">
                <h4>{translatedToday}</h4>
                <span>Рабочий день</span>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={offDay}
                  onChange={handleSetOffDay}
                />
                <span />
              </label>
            </div>

            <div className="timepickerHolder__box__wrap">
              <span>C</span>
              <div className="timepickerHolder__box__wrap__normal">
                <TimePicker
                  workingHour={workingHour}
                  setWorkingHour={setWorkingHour}
                />
              </div>

              <span>До</span>
              <div className="timepickerHolder__box__wrap__normal">
                <TimePicker
                  workingHour={closingWorkingHour}
                  setWorkingHour={setClosingWorkingHour}
                />
              </div>
            </div>

            <div className="timepickerHolder__box__buttons">
              <button className="toAllDays" onClick={handleToAllDays}>
                Применить <br />
                на все дни
              </button>

              <button onClick={handleSave} className="enterTime">
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

export default EditWorkHours;
