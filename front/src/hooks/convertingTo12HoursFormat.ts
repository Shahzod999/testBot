const convertTo12HourFormat = (timeRange: string): string => {
  const [start, end] = timeRange.split("-").map((time) => {
    const [hour] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour} ${period}`;
  });
  return `${start}–${end}`;
};

export default convertTo12HourFormat;
