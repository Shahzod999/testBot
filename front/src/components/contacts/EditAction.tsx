import { ReactSVG } from "react-svg";
import { ActionProps } from "../mainInfo/ActionButtons";
import "./editAction.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ContactProps extends ActionProps {
  isDisabled?: boolean;
  smallInfo?: string;
  arrowRight?: boolean;
  arrowDown?: boolean;
  editable?: boolean;
  handleEditTotalCompany?: (key: string, value: string) => void;
  objectKeys?: string;
  allowedValues?: string;
  textStartWith?: string | null;
  inputmode:
    | "text"
    | "search"
    | "none"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | undefined;
}
const EditAction = ({
  text,
  icon,
  isDisabled,
  smallInfo,
  arrowRight,
  arrowDown,
  editable,
  handleEditTotalCompany,
  objectKeys,
  allowedValues,
  textStartWith,
  inputmode,
}: ContactProps) => {
  const { t } = useTranslation();
  const [localValue, setLocalValue] = useState(text);
  const [isValid, setIsValid] = useState(true);

  const regex = allowedValues ? new RegExp(allowedValues) : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.trim();

    setLocalValue(newValue);

    let valid = true;

    if (regex && !regex.test(newValue.replace(textStartWith || "", ""))) {
      valid = false;
    }
    setIsValid(valid);

    if (valid && handleEditTotalCompany) {
      handleEditTotalCompany(objectKeys || "", textStartWith + newValue);
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
          <label className="actions__info__smallInfo__text">
            <span>{textStartWith}</span>
            <input
              type="text"
              value={localValue}
              onChange={handleChange}
              inputMode={inputmode}
            />
          </label>
        ) : (
          <span className="actions__info__text__main">{localValue}</span>
        )}
        {!isValid && (
          <span className="noAwailibleText">{t("invalidValue")}</span>
        )}
      </div>

      {arrowRight && (
        <ReactSVG src="./arrowRight.svg" className="actions__arrowRight" />
      )}

      {arrowDown && (
        <ReactSVG
          src="./arrows/arrowDown.svg"
          className="actions__arrowRight"
        />
      )}
    </button>
  );
};
export default EditAction;
