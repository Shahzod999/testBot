import { ActionProps } from "../mainInfo/ActionButtons";

interface ContactProps extends ActionProps {
  isDisabled?: boolean;
  mainText?: string;
  style?: string;
  arrowRight?: boolean;
  phone?: string;
}

export const ContactsActions = ({ text, icon, isDisabled, mainText, style, arrowRight, phone }: ContactProps) => {

  const handleClick = () => {
    if (phone) {
      console.log(`${phone}${text}`);
      window.location.href = `${phone}${text}`;
    }
  };

  
  return (
    <button onClick={handleClick} className={`${mainText ? "actions__mainText" : ""} ${style} actions pressEffefct ${isDisabled ? "actions--disabled" : ""}`}>
      <span className={`actions__icons ${isDisabled ? "actions__icons--disabled" : ""}`}>{mainText ? <>{mainText}</> : <img src={icon} alt="img" />}</span>
      <span className={`actions__text  ${isDisabled ? "actions__text--disabled" : ""}`}>
        {text}
        {arrowRight && <img src="./arrowRight.svg" />}
      </span>
    </button>
  );
};
