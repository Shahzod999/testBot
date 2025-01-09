import { useTranslation } from "react-i18next";

const useTimeAgo = (dateString: number) => {
  const { t } = useTranslation();
  const now = new Date();
  const pastDate = new Date(dateString);
  const diffMs = now.getTime() - pastDate.getTime();

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return t("daysAgo", { count: diffDays });
  } else if (diffHours > 0) {
    return t("hoursAgo", { count: diffHours });
  } else if (diffMinutes > 0) {
    return t("minutesAgo", { count: diffMinutes });
  } else {
    return t("lessThanMinute");
  }
};

export default useTimeAgo;
