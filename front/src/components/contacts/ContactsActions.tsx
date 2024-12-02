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

export const ContactsActions = ({ time, text, icon, isDisabled, mainText, style, arrowRight, phone }: ContactProps) => {
  const formatTime = (input: string) => {
    if (input === "Closed") {
      return "Закрыто";
    }

    const [start, end] = input.split("–").map((time) => {
      const [hour, meridian] = time.trim().split(" ");
      let hours = parseInt(hour, 10);
      if (meridian === "PM" && hours !== 12) {
        hours += 12;
      } else if (meridian === "AM" && hours === 12) {
        hours = 0;
      }
      return hours;
    });

    return `${start}:00–${end}:00`;
  };

  const handleClick = () => {
    if (phone) {
      console.log(phone);
      window.location.href = phone;
    }
  };

  const processText = (input: string | string[]) => {
    if (Array.isArray(input) && input.length > 0) {
      return time ? formatTime(input[0]) : input[0];
    }
    return input || "";
  };

  const displayText = processText(text);

  console.log(text);

  return (
    <button onClick={handleClick} className={`${mainText ? "actions__mainText" : ""} ${style} actions pressEffefct ${isDisabled ? "actions--disabled" : ""}`}>
      <span className={`actions__icons ${isDisabled ? "actions__icons--disabled" : ""}`}>{mainText ? <>{mainText}</> : <ReactSVG src={icon || ""} />}</span>

      {displayText === "Закрыто" ? (
        <span className="actions__text noAwailibleText">Закрыто</span>
      ) : (
        <span className={`actions__text ${isDisabled ? "actions__text--disabled" : ""}`}>
          {displayText}
          {arrowRight && <ReactSVG src="./arrowRight.svg" />}
        </span>
      )}
    </button>
  );
};
