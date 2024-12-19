import { ReactSVG } from "react-svg";
import { ActionProps } from "../mainInfo/ActionButtons";
import "./editAction.scss";
import { useState } from "react";

interface ContactProps extends ActionProps {
  isDisabled?: boolean;
  smallInfo?: string;
  arrowRight?: boolean;
  editable?: boolean;
  handleEditTotalCompany?: (key: string, value: string) => void;
  objectKeys?: string;
}
const EditAction = ({
  text,
  icon,
  isDisabled,
  smallInfo,
  arrowRight,
  editable,
  handleEditTotalCompany,
  objectKeys,
}: ContactProps) => {
  const [localValue, setLocalValue] = useState(text);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    if (handleEditTotalCompany) {
      handleEditTotalCompany(objectKeys || "", newValue);
    }
  };
  return (
    <button
      className={`actions pressEffefct ${
        isDisabled ? "actions--disabled" : ""
      }`}>
      <span className="actions__icons__edit">
        <ReactSVG src={icon || ""} />
      </span>
      <div className="actions__info">
        <span className="actions__info__smallInfo">{smallInfo}</span>
        {editable ? (
          <input type="text" value={localValue} onChange={handleChange} />
        ) : (
          <span className="actions__info__text__main">{localValue}</span>
        )}
      </div>

      {arrowRight && (
        <ReactSVG src="./arrowRight.svg" className="actions__arrowRight" />
      )}
    </button>
  );
};
export default EditAction;
