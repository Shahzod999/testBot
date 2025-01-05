import { WorkingHours } from "../../app/types/companyType";
import { useWorkingHours } from "../../hooks/useWorkingHours";

const WorkTime = ({ working_hours }: { working_hours: WorkingHours }) => {
  const { isOpen, hours, willOpenAt, closingIn } =
    useWorkingHours(working_hours);

    console.log(willOpenAt);
    

  return (
    <div className="mainInfo__openHours__left">
      {isOpen ? (
        <>
          {closingIn ? (
            <>
              <span className="warninText">До закрытия осталось</span>
              <p>{closingIn}</p>
            </>
          ) : hours.split("–")[1] ? (
            <>
              <span>Открыто</span>
              <p>{`До ${hours.split("–")[1]}`}</p>
            </>
          ) : (
            <>
              <span>Открыто</span>
              <p>Круглосуточно</p>
            </>
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
