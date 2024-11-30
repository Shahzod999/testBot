import React from "react";
import "./bottomSheet.scss";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  return (
    <>
      <div className={`bottom__wrapper ${isOpen ? "bottom__wrapper--active" : ""}`} onClick={onClose}></div>

      <div className={`bottom-sheet ${isOpen ? "bottom-sheet--open" : ""}`}>
        <div className="bottom-sheet__content">
          <div className="bottom-sheet__close" onClick={onClose}>
            <div></div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
