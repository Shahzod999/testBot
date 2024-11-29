import { ActionProps } from "../mainInfo/ActionButtons";

interface ContactProps extends ActionProps {
  isDisabled: boolean;
}

export const ContactsActions = ({ text, icon, isDisabled }: ContactProps) => {
  return (
    <button className={`actions pressEffefct ${isDisabled ? "actions--disabled" : ""}`}>
      <span className={`actions__icons ${isDisabled ? "actions__icons--disabled" : ""}`}>
        <object type="image/svg+xml" data={icon}>
          Your browser does not support SVG
        </object>
      </span>
      <span className={`actions__text ${isDisabled ? "actions__text--disabled" : ""}`}>{text}</span>
    </button>
  );
};
