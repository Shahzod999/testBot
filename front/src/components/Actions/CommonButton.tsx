import "./commonButton.scss";
import { ReactNode } from "react";

interface CommonButtonProps {
  children: ReactNode;
  createdFunction?: () => void;
}

const CommonButton = ({ children, createdFunction }: CommonButtonProps) => {
  return (
    <button className="commonButton" onClick={createdFunction}>
      {children}
    </button>
  );
};

export default CommonButton;
