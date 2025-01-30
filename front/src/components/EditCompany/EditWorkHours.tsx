import { useState } from "react";
import { ContactsActions } from "../contacts/ContactsActions";
// import TimePicker from "../TimePicker/TimePicker";
import "./editWorkHours.scss";
import BottomSheet from "../Actions/BottomSheet";
import { WorkingHours } from "../../app/types/companyType";
import convertTo12HourFormat from "../../hooks/convertingTo12HoursFormat";
import useDayTranslator from "../../hooks/translateDay";
import { hapticVibration } from "../../hooks/hapticVibration";
import { useTranslation } from "react-i18next";
import TimePicker from "../TimePicker/NewTimePicker/prog/TimePicker";

interface EditWorkHoursProps {
  day: string;
  hours: string;
  setTotalTime: (prev: any) => void;
}

const EditWorkHours = ({ day, hours, setTotalTime }: EditWorkHoursProps) => {
  const { t } = useTranslation();
  const translateDay = useDayTranslator();
  const translatedToday = translateDay(day);

  const [time, setTime] = useState(false);

  const [offDay, setOffDay] = useState(hours !== t("closed"));
  //тут

  const editedHours = hours.split("–");

  const [workingHour, setWorkingHour] = useState(editedHours[0]);
  const [closingWorkingHour, setClosingWorkingHour] = useState(editedHours[1]);

  // const formatTime = (hour: number, minute: number) =>
  //   `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

  const updatedTime = `${workingHour}-${closingWorkingHour}`;

  const handleSave = () => {
    if (!offDay) {
      setTotalTime((prev: WorkingHours) => ({ ...prev, [day]: ["Closed"] }));
    } else {
      const fotmated = convertTo12HourFormat(updatedTime);
      setTotalTime((prev: WorkingHours) => ({ ...prev, [day]: [fotmated] }));
    }
    setTime(false);
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
  };

  const openTime = () => {
    setTime(true);
  };

  const closeTime = () => {
    setTime(false);
  };

  const handleSetOffDay = () => {
    hapticVibration("success", "light");
    setOffDay(!offDay);
  };

  const handleTimeChange = (time: string) => {
    setWorkingHour(time);
  };
  const handleCloseTimeChange = (time: string) => {
    setClosingWorkingHour(time);
  };

  console.log(hours, "ssss");
  console.log(updatedTime);

  return (
    <>
      <div onClick={openTime}>
        <ContactsActions
          text={hours}
          mainText={translatedToday}
          style={"editWorkHour"}
          isDisabled={hours === t("closed")}
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
                <span>{t("workingDay")}</span>
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
              <span>{t("from")}</span>
              <div className="timepickerHolder__box__wrap__normal">
                {/* <TimePicker
                  workingHour={workingHour}
                  setWorkingHour={setWorkingHour}
                /> */}
                <TimePicker
                  value={editedHours[0]}
                  onChange={handleTimeChange}
                />
              </div>

              <span>{t("to")}</span>
              <div className="timepickerHolder__box__wrap__normal">
                {/* <TimePicker
                  workingHour={closingWorkingHour}
                  setWorkingHour={setClosingWorkingHour}
                /> */}
                <TimePicker
                  value={"00:00"}
                  onChange={handleCloseTimeChange}
                />
              </div>
            </div>

            <div className="timepickerHolder__box__buttons">
              <button className="toAllDays" onClick={handleToAllDays}>
                {t("applyToAllDays")}
              </button>

              <button onClick={handleSave} className="enterTime">
                {t("save")}
              </button>
            </div>
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

export default EditWorkHours;
