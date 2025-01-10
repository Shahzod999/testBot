import i18n from "../app/utils/i18n";

const convertTo24HourFormat = (timeRange: string | string[]): string => {
  if (Array.isArray(timeRange)) {
    return timeRange.map(convertTo24HourFormat).join(", ");
  }

  if (timeRange === "Closed") return i18n.t("closed");;
  if (timeRange === "Open 24 hours") return i18n.t("open24Hours");;
  if (!timeRange || !timeRange?.includes("–")) return i18n.t("invalidData");;

  const [start, end] = timeRange.split("–").map((time) => time.trim());

  const to24Hour = (time: string): string => {
    const [timePart, period] = time.split(" ");
    let [hour, minute = "00"] = timePart.split(":").map(Number);

    if (period === "PM" && hour < 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0",
    )}`;
  };

  return `${to24Hour(start)}–${to24Hour(end)}`;
};

export default convertTo24HourFormat;
