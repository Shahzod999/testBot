import "./commonButton.scss";
import { ReactNode } from "react";

interface CommonButtonProps {
  children: ReactNode;
  createdFunction?: () => void;
  disabled?: boolean;
}

const CommonButton = ({
  children,
  createdFunction,
  disabled,
}: CommonButtonProps) => {
  
  const handleHaptic = () => {
    window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
    if (createdFunction) {
      createdFunction();
    }
  };

  return (
    <button className="commonButton" onClick={handleHaptic} disabled={disabled}>
      {children}
    </button>
  );
};

export default CommonButton;
