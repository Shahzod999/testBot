import { ReactSVG } from "react-svg";

export interface ActionProps {
  text: string | string[] | undefined;
  icon?: string;
}

const ActionButtons = ({ text, icon }: ActionProps) => {
  return (
    <>
      <ReactSVG src={icon || ""} />
      <span>{text}</span>
    </>
  );
};

export default ActionButtons;
