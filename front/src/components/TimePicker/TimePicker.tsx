import React, { useRef, useEffect } from "react";
import "./TimePicker.scss";

interface TimePickerProps {
  workingHour: { hour: number; minute: number };
  setWorkingHour: React.Dispatch<
    React.SetStateAction<{ hour: number; minute: number }>
  >;
}

const TimePicker = ({ workingHour, setWorkingHour }: TimePickerProps) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  const scrollTimeout = useRef<any | null>(null);

  const handleScrollEnd = (
    ref: React.RefObject<HTMLDivElement>,
    items: number[],
    key: "hour" | "minute",
  ) => {
    if (ref.current) {
      const itemHeight = 40;
      const scrollTop = ref.current.scrollTop;
      const index = Math.round(scrollTop / itemHeight);

      setWorkingHour((prev) => ({
        ...prev,
        [key]: items[index],
      }));

      ref.current.scrollTo({
        top: index * itemHeight,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = (
    items: number[],
    key: "hour" | "minute",
    ref: React.RefObject<HTMLDivElement>,
  ) => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      handleScrollEnd(ref, items, key);
    }, 150);
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
    scrollToValue(hourRef, workingHour.hour);
    scrollToValue(minuteRef, workingHour.minute);
  }, [workingHour]);

  return (
    <div className="timepicker">
      <div
        className="picker"
        ref={hourRef}
        onScroll={() => handleScroll(hours, "hour", hourRef)}>
        <div className="picker-padding" />
        <div className="picker-list">
          {hours.map((hour) => (
            <div
              key={hour}
              className={`picker-item ${
                hour === workingHour.hour ? "selected" : ""
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
        onScroll={() => handleScroll(minutes, "minute", minuteRef)}>
        <div className="picker-padding" />
        <div className="picker-list">
          {minutes.map((minute) => (
            <div
              key={minute}
              className={`picker-item ${
                minute === workingHour.minute ? "selected" : ""
              }`}>
              {minute.toString().padStart(2, "0")}
            </div>
          ))}
        </div>
        <div className="picker-padding" />
      </div>
    </div>
  );
};

export default TimePicker;
