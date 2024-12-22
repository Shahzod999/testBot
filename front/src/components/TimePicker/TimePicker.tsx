import React, { useState, useRef, useEffect } from "react";
import "./TimePicker.scss";

const TimePicker = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(30);

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  const handleScroll = (
    e: React.UIEvent<HTMLDivElement>,
    items: number[],
    setSelected: (value: number) => void,
  ) => {
    const scrollTop = e.currentTarget.scrollTop;
    const itemHeight = 40; // Высота одного элемента
    const index = Math.round(scrollTop / itemHeight);
    setSelected(items[index]);
  };

  const scrollToValue = (
    ref: React.RefObject<HTMLDivElement>,
    value: number,
  ) => {
    const itemHeight = 40;
    if (ref.current) {
      ref.current.scrollTo({
        top: value * itemHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToValue(hourRef, selectedHour);
    scrollToValue(minuteRef, selectedMinute);
  }, [selectedHour, selectedMinute]);

  console.log(selectedHour, selectedMinute);

  return (
    <div className="timepicker" onClick={(e) => e.stopPropagation()}>
      <div
        className="picker"
        ref={hourRef}
        onScroll={(e) => handleScroll(e, hours, setSelectedHour)}>
        <div className="picker-padding" />
        <div className="picker-list">
          {hours.map((hour) => (
            <div
              key={hour}
              className={`picker-item ${
                hour === selectedHour ? "selected" : ""
              }`}>
              {hour.toString().padStart(2, "0")}
            </div>
          ))}
        </div>
        <div className="picker-padding" />
      </div>
      <div
        className="picker"
        ref={minuteRef}
        onScroll={(e) => handleScroll(e, minutes, setSelectedMinute)}>
        <div className="picker-padding" />
        <div className="picker-list">
          {minutes.map((minute) => (
            <div
              key={minute}
              className={`picker-item ${
                minute === selectedMinute ? "selected" : ""
              }`}>
              {minute.toString().padStart(2, "0")}
            </div>
          ))}
        </div>
        <div className="picker-padding" />
      </div>


      <button>SEt</button>
    </div>
  );
};

export default TimePicker;
