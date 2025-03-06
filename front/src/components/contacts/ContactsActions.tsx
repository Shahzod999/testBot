import { hapticVibrationByType } from "../../hooks/hapticVibration";
import { ActionProps } from "../mainInfo/ActionButtons";
import { ReactSVG } from "react-svg";

interface ContactProps extends ActionProps {
  isDisabled?: boolean;
  mainText?: string;
  style?: string;
  arrowRight?: boolean;
  phone?: string | null;
  onClick?: () => void;
}

export const ContactsActions = ({
  text,
  icon,
  isDisabled,
  mainText,
  style,
  arrowRight,
  phone,
  onClick,
}: ContactProps) => {
  const handleClick = () => {
    onClick?.();

    if (isDisabled) {
      hapticVibrationByType("error");
    }

    if (phone) {
      window.Telegram.WebApp.openLink(phone);
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

      <span className={`actions__text ${isDisabled ? "noAwailibleText" : ""}`}>
        <span
          className={`actions__text__letters ${
            isDisabled ? "noAwailibleText" : ""
          }`}>
          {text}
        </span>
      </span>

      {arrowRight && (
        <ReactSVG src="./arrowRight.svg" className="svgController" />
      )}
    </button>
  );
};
