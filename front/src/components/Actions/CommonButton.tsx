import "./commonButton.scss";
import { ReactNode } from "react";

interface CommonButtonProps {
  children: ReactNode;
  createdFunction?: () => void;
  disabled?: boolean;
}

const CommonButton = ({ children, createdFunction, disabled }: CommonButtonProps) => {
  return (
    <button className="commonButton" onClick={createdFunction} disabled={disabled}>
      {children}
    </button>
  );
};

export default CommonButton;
