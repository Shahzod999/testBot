import { useMemo } from "react";
import { WorkingHours } from "../app/types/companyType";
import { useWorkingHours } from "../hooks/useWorkingHours";
import { useTranslation } from "react-i18next";

export const useWorkTimeStatus = (working_hours: WorkingHours) => {
  const { isOpen, hours, willOpenAt, closingIn } =
    useWorkingHours(working_hours);
  const { t } = useTranslation();

  const { status, workingHours } = useMemo(() => {
    if (!working_hours || Object.keys(working_hours).length === 0) {
      return { status: t("workTimeNotSpecified"), workingHours: "" };
    }

    if (isOpen) {
      if (closingIn) {
        return { status: t("closingIn"), workingHours: closingIn };
      }
      return {
        status: t("open"),
        workingHours: hours.split("–")[1]
          ? t("openUntil", { time: hours.split("–")[1] })
          : t("open24Hours"),
      };
    }

    if (willOpenAt) {
      return {
        status: t("closed"),
        workingHours: `${t("opensAt")} ${willOpenAt}`,
      };
    }

    return { status: t("closed"), workingHours: t("closedToday") };
  }, [working_hours, isOpen, hours, willOpenAt, closingIn, t]);

  return { status, workingHours };
};
