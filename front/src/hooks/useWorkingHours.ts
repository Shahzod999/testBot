import { useMemo } from "react";
import { WorkingHours } from "../app/types/companyType";
import convertTo24HourFormat from "./convertTo24HourFormat";
import { useTranslation } from "react-i18next";

export const useWorkingHours = (workingHours: WorkingHours) => {
  const { t } = useTranslation();

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
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const getOpeningTime = (dayIndex: number): string | null => {
      const day = daysOfWeek[dayIndex];
      const hours = workingHours?.[day]?.[0] || t("closed");

      if (hours === "Closed" || hours === t("closed")) return null;
      return convertTo24HourFormat(hours).split("–")[0];
    };

    const todayHours =
      workingHours?.[daysOfWeek[todayIndex]]?.[0] || t("closed");
    const yesterdayIndex = (todayIndex - 1 + 7) % 7;
    const yesterdayHours =
      workingHours?.[daysOfWeek[yesterdayIndex]]?.[0] || t("closed");

    if (todayHours === "Open 24 hours") {
      return {
        isOpen: true,
        hours: t("open24Hours"),
        willOpenAt: null,
        closingIn: null,
      };
    }

    const checkOvernight = (hours: string, isYesterday = false) => {
      if (hours !== t("closed")) {
        const [start, end] = convertTo24HourFormat(hours)
          .split("–")
          .map((time) => {
            const [h, m] = time.split(":").map(Number);
            return h * 60 + m;
          });

        const isOvernight = end <= start;

        if (isOvernight) {
          if (
            (isYesterday && currentMinutes < end) ||
            (!isYesterday && currentMinutes >= start)
          ) {
            const minutesToClose =
              currentMinutes >= start
                ? 1440 - currentMinutes + end
                : end - currentMinutes;
            return {
              isOpen: true,
              hours: convertTo24HourFormat(hours),
              willOpenAt: null,
              closingIn:
                minutesToClose <= 30
                  ? t("closingInMinutes", { minutes: minutesToClose })
                  : null,
            };
          }
        }
      }
      return null;
    };

    const overnightStatus =
      checkOvernight(yesterdayHours, true) || checkOvernight(todayHours);
    if (overnightStatus) return overnightStatus;

    if (todayHours !== t("closed")) {
      const [start] = convertTo24HourFormat(todayHours)
        .split("–")
        .map((time) => {
          const [h, m] = time.split(":").map(Number);
          return h * 60 + m;
        });
      if (currentMinutes < start) {
        return {
          isOpen: false,
          hours: todayHours,
          willOpenAt: `${t("todayAt")} ${
            convertTo24HourFormat(todayHours).split("–")[0]
          }`,
          closingIn: null,
        };
      }
    }

    for (let offset = 1; offset < 7; offset++) {
      const nextDayIndex = (todayIndex + offset) % 7;
      const nextOpeningTime = getOpeningTime(nextDayIndex);

      const daysMap = {
        Sunday: t("sunday"),
        Monday: t("monday"),
        Tuesday: t("tuesday"),
        Wednesday: t("wednesday"),
        Thursday: t("thursday"),
        Friday: t("friday"),
        Saturday: t("saturday"),
      };

      if (nextOpeningTime) {
        const nextDayName =
          offset === 1 ? t("tomorrowAt") : daysMap[daysOfWeek[nextDayIndex]];
        return {
          isOpen: false,
          hours: t("closed"),
          willOpenAt: `${nextDayName} ${nextOpeningTime}`,
          closingIn: null,
        };
      }
    }

    return {
      isOpen: false,
      hours: t("closed"),
      willOpenAt: null,
      closingIn: null,
    };
  }, [workingHours]);
};

///////
///
///