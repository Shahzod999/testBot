import { useTranslation } from "react-i18next";
import { WorkingHours } from "../../app/types/companyType";
import { useWorkingHours } from "../../hooks/useWorkingHours";

const WorkTime = ({ working_hours }: { working_hours: WorkingHours }) => {
  const { isOpen, hours, willOpenAt, closingIn } =
    useWorkingHours(working_hours);
  const { t } = useTranslation();

  console.log(hours, "22");
  console.log(isOpen);
  

  return (
    <div className="mainInfo__openHours__left">
      {isOpen ? (
        <>
          {closingIn ? (
            <>
              <span className="warninText">{t("closingIn")}</span>
              <p>{closingIn}</p>
            </>
          ) : hours.split("–")[1] ? (
            <>
              <span>{t("open")}</span>
              <p>{t("openUntil", { time: hours.split("–")[1] })}</p>
            </>
          ) : (
            <>
              <span>Открыто</span>
              <p>{t("open24Hours")}</p>
            </>
          )}
        </>
      ) : willOpenAt ? (
        <>
          <span className="noAwailibleText">{t("closed")}</span>
          <p>{`${t("opensAt")} ${willOpenAt}`}</p>
        </>
      ) : (
        <>
          <span className="noAwailibleText">{t("closed")}</span>
          <p>{t("closedToday")}</p>
        </>
      )}
    </div>
  );
};

export default WorkTime;
