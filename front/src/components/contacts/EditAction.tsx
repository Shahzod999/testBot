import { ActionProps } from "../mainInfo/ActionButtons";
import "./editAction.scss";

interface ContactProps extends ActionProps {
  isDisabled?: boolean;
  smallInfo?: string;
}

const EditAction = ({ text, icon, isDisabled, smallInfo }: ContactProps) => {
  return (
    <button className={`actions pressEffefct ${isDisabled ? "actions--disabled" : ""}`}>
      <span className="actions__icons__edit">
        <img src={icon} alt="img" />
      </span>
      <div className="actions__info">
        <span className="actions__info__smallInfo">{smallInfo}</span>
        <span className="actions__info__text__main">{text}</span>
      </div>
    </button>
  );
};

export default EditAction;
