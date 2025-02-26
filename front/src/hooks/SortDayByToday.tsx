import { useMemo } from "react";
import { WorkingHours } from "../app/types/companyType";

const SortDayByToday = (workingHours: WorkingHours): WorkingHours => {
  return useMemo(() => {
    if (!workingHours) return {};

    const daysOrder: (keyof WorkingHours)[] = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const todayIndex = new Date().getDay(); // 0 (Sunday) to 6 (Saturday)
    // Приводим индекс к нужному дню недели
    const adjustedTodayIndex = todayIndex === 0 ? 6 : todayIndex - 1; // Понедельник = 0, Воскресенье = 6

    // Формируем новый порядок дней, начиная с завтрашнего дня
    const sortedDaysOrder = [
      ...daysOrder.slice(adjustedTodayIndex + 1),
      ...daysOrder.slice(0, adjustedTodayIndex),
    ];

    return sortedDaysOrder.reduce((sortedObj, day) => {
      if (workingHours[day]) {
        sortedObj[day] = workingHours[day];
      }
      return sortedObj;
    }, {} as WorkingHours);
  }, [workingHours]);
};

export default SortDayByToday;
