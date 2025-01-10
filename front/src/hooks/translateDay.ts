import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const useDayTranslator = () => {
  const { t } = useTranslation();

  const translateDay = (day: string): string => {
    // Используем i18n для перевода
    const dayKey = day.toLowerCase(); // Преобразуем ключ в нижний регистр
    return t(dayKey) || day; // Если перевода нет, возвращаем исходное значение
  };

  return useMemo(() => translateDay, [t]);
};

export default useDayTranslator;
