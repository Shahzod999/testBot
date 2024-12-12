import { useMemo } from "react";
import { WorkingHours } from "../../app/types/companyType";

// Функция для преобразования времени из формата AM/PM в 24-часовой формат
const convertTo24HourFormat = (timeRange: string): string => {
  if (timeRange === "Closed") return "Закрыто";
  if (timeRange === "Open 24 hours") return "Открыто 24 часа";

  if (!timeRange || !timeRange.includes("–")) return "Некорректные данные";

  const [start, end] = timeRange.split("–").map((time) => time.trim());

  const to24Hour = (time: string): string => {
    const [hourPart, period] = time.split(/[: ]/);
    let [h, m = "00"] = hourPart.split(":").map(Number);
    if (period === "PM" && h < 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  return `${to24Hour(start)}–${to24Hour(end)}`;
};

export const useWorkingHours = (workingHours: WorkingHours) => {
  return useMemo(() => {
    const daysOfWeek: (keyof WorkingHours)[] = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = daysOfWeek[new Date().getDay()];
    const hours = workingHours[today]?.[0] || "Closed";

    const isOpen = hours !== "Closed" && hours !== "Закрыто";
    const convertedHours = convertTo24HourFormat(hours);

    return { isOpen, hours: convertedHours };
  }, [workingHours]);
};
