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
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes(); // Текущее время в минутах

    const hours = workingHours[today]?.[0] || "Closed";

    if (hours === "Closed" || hours === "Закрыто") {
      return { isOpen: false, hours: "Закрыто", willOpenAt: null };
    }

    if (hours === "Open 24 hours") {
      return { isOpen: true, hours: "Открыто 24 часа", willOpenAt: null };
    }

    const convertedHours = convertTo24HourFormat(hours);
    const [start, end] = convertedHours.split("–").map((time) => {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m; // Время в минутах
    });

    const isOpen = currentMinutes >= start && currentMinutes < end;
    const willOpenAt = !isOpen && currentMinutes < start ? convertedHours.split("–")[0] : null;

    return { isOpen, hours: convertedHours, willOpenAt };
  }, [workingHours]);
};
