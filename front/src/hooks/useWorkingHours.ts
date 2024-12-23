import { useMemo } from "react";
import { WorkingHours } from "../app/types/companyType";
import convertTo24HourFormat from "./convertTo24HourFormat";

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
    const todayIndex = new Date().getDay();
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes(); // Текущее время в минутах

    // Функция получения времени открытия
    const getOpeningTime = (dayIndex: number): string | null => {
      const day = daysOfWeek[dayIndex];
      const hours = workingHours[day]?.[0] || "Closed";

      if (hours === "Closed" || hours === "Закрыто") return null;
      return convertTo24HourFormat(hours).split("–")[0]; // Возвращаем время открытия
    };

    // Проверяем сегодняшнее расписание
    const todayHours = workingHours[daysOfWeek[todayIndex]]?.[0] || "Closed";

    if (todayHours === "Open 24 hours") {
      // Если заведение работает круглосуточно
      return {
        isOpen: true,
        hours: "Открыто 24 часа",
        willOpenAt: null,
      };
    }
    
    if (todayHours !== "Closed") {
      const [start, end] = convertTo24HourFormat(todayHours)
        .split("–")
        .map((time) => {
          const [h, m] = time.split(":").map(Number);
          return h * 60 + m; // Время в минутах
        });

      if (currentMinutes < start) {
        // Сегодня заведение еще не открылось
        return {
          isOpen: false,
          hours: todayHours,
          willOpenAt: `сегодня в ${
            convertTo24HourFormat(todayHours).split("–")[0]
          }`,
        };
      } else if (currentMinutes >= start && currentMinutes < end) {
        // Сегодня заведение открыто
        return { isOpen: true, hours: convertTo24HourFormat(todayHours), willOpenAt: null };
      }
    }

    // Ищем ближайший день открытия
    for (let offset = 1; offset < 7; offset++) {
      const nextDayIndex = (todayIndex + offset) % 7;
      const nextOpeningTime = getOpeningTime(nextDayIndex);

      if (nextOpeningTime) {
        const nextDayName = offset === 1 ? "завтра" : daysOfWeek[nextDayIndex];
        return {
          isOpen: false,
          hours: "Закрыто",
          willOpenAt: `${nextDayName} в ${nextOpeningTime}`,
        };
      }
    }

    // Если заведение не работает всю неделю
    return { isOpen: false, hours: "Закрыто", willOpenAt: null };
  }, [workingHours]);
};
