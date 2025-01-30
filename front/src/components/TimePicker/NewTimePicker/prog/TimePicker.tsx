import { useState } from "react";

import "../styles/react-wheel-time-picker.css";
import TimePickerSelection from "./TimePickerSelection";
import TimePickerWrapper from "./TimePickerWrapper";
import { TimePickerProps } from "./TimePicker.type";

function TimePicker({
  value: initialValue, // сюда мы устанавливаем начальное значение времени классная штука например 18:50
  cellHeight = 30, // высота важна для корректной работы
  onChange = () => {},
  onSave = () => {},
  onCancel = () => {},
  seperator = true,
  isDarkMode,
}: TimePickerProps) {
  const [height] = useState(cellHeight);

  const params = {
    onChange,
    height,
    onSave,
    onCancel,
    seperator,
    initialValue,
    isDarkMode,
  };

  return (
    <TimePickerWrapper>
      <div>
        <div className="react-wheel-time-picker-popup">
          <TimePickerSelection {...params} />
        </div>
      </div>
    </TimePickerWrapper>
  );
}

export default TimePicker;
