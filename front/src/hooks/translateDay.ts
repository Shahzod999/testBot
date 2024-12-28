import { useMemo } from "react";

const useDayTranslator = () => {
  const daysMap: Record<string, string> = {
    Sunday: "Воскресенье",
    Monday: "Понедельник",
    Tuesday: "Вторник",
    Wednesday: "Среда",
    Thursday: "Четверг",
    Friday: "Пятница",
    Saturday: "Суббота",
  };

  const translateDay = (day: string): string => {
    return daysMap[day] || day;
  };

  return useMemo(() => translateDay, [daysMap]);
};

export default useDayTranslator;
