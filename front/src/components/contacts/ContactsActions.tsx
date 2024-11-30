import { ActionProps } from "../mainInfo/ActionButtons";

interface ContactProps extends ActionProps {
  isDisabled?: boolean;
  mainText?: string;
  style?: string;
}

export const ContactsActions = ({ text, icon, isDisabled, mainText, style }: ContactProps) => {
  return (
    <button className={`${mainText ? "actions__mainText" : ""} ${style} actions pressEffefct ${isDisabled ? "actions--disabled" : ""}`}>
      <span className={`actions__icons ${isDisabled ? "actions__icons--disabled" : ""}`}>{mainText ? <>{mainText}</> : <img src={icon} alt="img" />}</span>
      <span className={`actions__text  ${isDisabled ? "actions__text--disabled" : ""}`}>{text}</span>
    </button>
  );
};
