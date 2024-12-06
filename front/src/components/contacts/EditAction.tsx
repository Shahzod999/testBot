import { ReactSVG } from "react-svg";
import { ActionProps } from "../mainInfo/ActionButtons";
import "./editAction.scss";

interface ContactProps extends ActionProps {
  isDisabled?: boolean;
  smallInfo?: string;
  arrowRight?: boolean;
}
const EditAction = ({ text, icon, isDisabled, smallInfo, arrowRight }: ContactProps) => {
  return (
    <button className={`actions pressEffefct ${isDisabled ? "actions--disabled" : ""}`}>
      <span className="actions__icons__edit">
        <ReactSVG src={icon || ""} />
      </span>
      <div className="actions__info">
        <span className="actions__info__smallInfo">{smallInfo}</span>
        <span className="actions__info__text__main">{text}</span>
      </div>

      {arrowRight && <ReactSVG src="./arrowRight.svg" className="actions__arrowRight" />}
    </button>
  );
};
export default EditAction;
