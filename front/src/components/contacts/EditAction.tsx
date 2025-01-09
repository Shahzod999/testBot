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
  allowedValues?: string;
  textStartWith?: string;
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
  allowedValues,
  textStartWith,
}: ContactProps) => {
  const [localValue, setLocalValue] = useState(text);
  const [isValid, setIsValid] = useState(true);

  const regex = allowedValues ? new RegExp(allowedValues) : null;

  console.log(regex);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace("@", "");

    if (textStartWith) {
      if (!newValue.startsWith(textStartWith)) {
        const partialPrefix = textStartWith.slice(0, newValue.length);
        if (newValue.startsWith(partialPrefix)) {
          newValue = textStartWith;
        } else {
          newValue = textStartWith + newValue.replace(textStartWith, "");
        }
      }
    }

    setLocalValue(newValue);

    let valid = true;

    if (regex && !regex.test(newValue.replace(textStartWith || "", ""))) {
      console.log(newValue.replace(textStartWith || "", ""));

      valid = false;
    }
    setIsValid(valid);

    if (valid && handleEditTotalCompany) {
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
        {!isValid && (
          <span className="noAwailibleText">Некорректное значение</span>
        )}
      </div>

      {arrowRight && (
        <ReactSVG src="./arrowRight.svg" className="actions__arrowRight" />
      )}
    </button>
  );
};
export default EditAction;
