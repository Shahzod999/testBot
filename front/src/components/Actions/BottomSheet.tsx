import React, { memo, useEffect, useState } from "react";
import "./bottomSheet.scss";
import CompanyLink from "../CompanyLink/CompanyLink";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet = memo(({ isOpen, onClose, children }: BottomSheetProps) => {
  const [startY, setStartY] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY === null) return;
    const touchY = e.touches[0].clientY;
    setCurrentY(touchY);
    if (touchY - startY > 0) {
      setIsDragging(true);
    }
  };

  const handleTouchEnd = () => {
    if (startY !== null && currentY !== null && currentY - startY > 100) {
      onClose();
    }

    setStartY(null);
    setCurrentY(null);
    setIsDragging(false);
  };

  useEffect(() => {
    const handleBackButtonClick = () => {
      if (isOpen) {
        window.history.back();
      }
    };

    if (isOpen) {
      window.Telegram.WebApp.BackButton.show();
      window.Telegram.WebApp.BackButton.onClick(handleBackButtonClick);
    } else {
      window.Telegram.WebApp.BackButton.hide();
      window.Telegram.WebApp.BackButton.offClick(handleBackButtonClick);
    }

    return () => {
      window.Telegram.WebApp.BackButton.hide();
      window.Telegram.WebApp.BackButton.offClick(handleBackButtonClick);
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`bottom__wrapper ${isOpen ? "bottom__wrapper--active" : ""}`}
        onClick={onClose}></div>

      <div
        className={`bottom-sheet ${isOpen ? "bottom-sheet--open" : ""} ${
          isDragging ? "bottom-sheet--dragging" : ""
        }`}
        draggable={false}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        <div className="bottom-sheet__content">
          <div className="bottom-sheet__close" onClick={onClose}>
            <div></div>
          </div>
          {children}
        </div>
        <CompanyLink />
      </div>
    </>
  );
});

export default BottomSheet;
