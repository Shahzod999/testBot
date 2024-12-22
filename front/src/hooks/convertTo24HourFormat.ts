const convertTo24HourFormat = (timeRange: string | string[]): string => {
  if (Array.isArray(timeRange)) {
    return timeRange.map(convertTo24HourFormat).join(", ");
  }

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

export default convertTo24HourFormat;
