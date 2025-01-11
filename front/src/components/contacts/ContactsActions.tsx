import { ReactNode } from "react";
import { ActionProps } from "../mainInfo/ActionButtons";
import { ReactSVG } from "react-svg";
import { hapticVibration } from "../../hooks/hapticVibration";

interface ContactProps extends ActionProps {
  isDisabled?: boolean;
  mainText?: string;
  style?: string;
  arrowRight?: boolean;
  phone?: string | null;
  timeComponent?: ReactNode;
}

export const ContactsActions = ({
  text,
  icon,
  isDisabled,
  mainText,
  style,
  arrowRight,
  phone,
  timeComponent,
}: ContactProps) => {
  const handleClick = () => {
    if (isDisabled) {
      hapticVibration("success", "light");
    }

    if (phone) {
      window.open(phone);
    }
  };

  

  return (
    <button
      onClick={handleClick}
      className={`${
        mainText ? "actions__mainText" : ""
      } ${style} actions pressEffefct ${
        isDisabled ? "actions--disabled" : ""
      }`}>
      <span
        className={`actions__icons ${
          isDisabled ? "actions__icons--disabled" : ""
        }`}>
        {mainText ? <>{mainText}</> : <ReactSVG src={icon || ""} />}
      </span>

      {timeComponent ? (
        <span
          className={`actions__text ${isDisabled ? "noAwailibleText" : ""}`}>
          <span className="actions__text__letters">{timeComponent}</span>
        </span>
      ) : (
        <span
          className={`actions__text ${isDisabled ? "noAwailibleText" : ""}`}>
          <span
            className={`actions__text__letters ${
              isDisabled ? "noAwailibleText" : ""
            }`}>
            {text}
          </span>
        </span>
      )}
      {arrowRight && (
        <ReactSVG src="./arrowRight.svg" className="svgController" />
      )}
    </button>
  );
};
