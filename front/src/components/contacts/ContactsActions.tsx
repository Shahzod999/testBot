import { ActionProps } from "../mainInfo/ActionButtons";
import { ReactSVG } from "react-svg";

interface ContactProps extends ActionProps {
  isDisabled?: boolean;
  mainText?: string;
  style?: string;
  arrowRight?: boolean;
  phone?: string | null;
  time?: boolean; // Указывает, требуется ли обработка времени
}

export const ContactsActions = ({
  text,
  icon,
  isDisabled,
  mainText,
  style,
  arrowRight,
  phone,
}: ContactProps) => {
  const formatTime = (input: string | string[]) => {
    if (Array.isArray(input)) {
      return input
        .map((day) => {
          if (day === "Open 24 hours") return "Открыто 24 часа";
          if (day === "Closed") return "Выходной";
          return day;
        })
        .join(", ");
    }
    if (input === "Open 24 hours") return "Открыто 24 часа";
    if (input === "Closed") return "Выходной";
    return input;
  };

  const handleClick = () => {
    if (phone) {
      window.open(phone);
    }
  };

  const processText = (input: string | string[] | Record<string, string[]>) => {
    if (typeof input === "object" && !Array.isArray(input)) {
      return Object.entries(input)
        .map(([day, hours]) => `${day}: ${formatTime(hours)}`)
        .join("\n");
    } else if (Array.isArray(input)) {
      return formatTime(input);
    }
    return input || "";
  };

  const displayText = processText(text);

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

      {displayText === "Закрыто" ? (
        <span className="actions__text noAwailibleText">Закрыто</span>
      ) : (
        <span
          className={`actions__text ${isDisabled ? "noAwailibleText" : ""}`}>
          {displayText}
          {arrowRight && <ReactSVG src="./arrowRight.svg" className="svgController"/>}
        </span>
      )}
    </button>
  );
};
