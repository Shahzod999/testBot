import { WorkingHours } from "../../app/types/companyType";
import { useWorkingHours } from "../../hooks/useWorkingHours";

const WorkTime = ({ working_hours }: { working_hours: WorkingHours }) => {
  const { isOpen, hours, willOpenAt } = useWorkingHours(working_hours);

  console.log(willOpenAt);
  

  return (
    <div className="mainInfo__openHours__left">
      {isOpen ? (
        <>
          <span>Открыто</span>
          {hours.split("–")[1] ? (
            <p>{`До ${hours.split("–")[1]}`}</p>
          ) : (
            <p>Круглосуточно</p>
          )}
        </>
      ) : willOpenAt ? (
        <>
          <span className="noAwailibleText">Закрыто</span>
          <p>{`Откроется ${willOpenAt}`}</p>
        </>
      ) : (
        <>
          <span className="noAwailibleText">Закрыто</span>
          <p>Сегодня не работает</p>
        </>
      )}
    </div>
  );
};

export default WorkTime;
