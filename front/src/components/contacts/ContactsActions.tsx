import { ActionProps } from "../mainInfo/ActionButtons";

interface ContactProps extends ActionProps {
  isDisabled: boolean;
}

export const ContactsActions = ({ text, icon, isDisabled }: ContactProps) => {
  return (
    <div className={`actions ${isDisabled ? "actions--disabled" : ""}`}>
      <span
        className={`actions__icons ${
          isDisabled ? "actions__icons--disabled" : ""
        }`}>
        {icon}
      </span>
      <span
        className={`actions__text ${
          isDisabled ? "actions__text--disabled" : ""
        }`}>
        {text}
      </span>
    </div>
  );
};
