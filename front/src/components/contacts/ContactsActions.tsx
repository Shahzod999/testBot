import { ActionProps } from "../mainInfo/ActionButtons";

export const ContactsActions = ({ text, icon }: ActionProps) => {
  return (
    <div className="actions">
      <span className="actions__icons">{icon}</span>
      <span className="actions__text">{text}</span>
    </div>
  );
};
